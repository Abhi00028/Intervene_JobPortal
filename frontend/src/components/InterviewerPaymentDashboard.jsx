
import { useState, useEffect } from 'react';
import './InterviewerPaymentDashboard.css';
import { useLocation } from "react-router-dom";

const InterviewerPaymentDashboard = () => {
  const location = useLocation();
  const interviewerId = location.state?.interviewerID;
  const [earnings, setEarnings] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Fetch current earnings and payment history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch earnings
        const earningsResponse = await fetch(`http://localhost:4000/api/v1/earnings/${interviewerId}`);
        const earningsData = await earningsResponse.json();
        if (earningsData.totalEarnings !== undefined) {
          setEarnings(earningsData.totalEarnings);
        }

        // Fetch payment history (you'll need to implement this endpoint)
        const historyResponse = await fetch(`http://localhost:4000/api/v1/payments/${interviewerId}`);
        const historyData = await historyResponse.json();
        setPaymentHistory(historyData.payments || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (interviewerId) {
      fetchData();
    }
  }, [interviewerId]);

  const handleWithdrawChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount)) {
      alert('Please enter a valid number');
      return;
    }

    if (amount <= 0) {
      alert('Amount must be greater than zero');
      return;
    }

    if (amount > earnings) {
      alert(`You cannot withdraw more than your current balance of $${earnings.toFixed(2)}`);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/v1/withdraw', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          amount: amount.toFixed(2), 
          email: 'abhishek27bhardwaj@gmail.com', 
          interviewerId 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.details?.description || 'Payment failed');
      }

      if (data.success) {
        alert(`Success! Payout ID: ${data.payout.batch_id}`);
        setEarnings(data.remaining_balance);
        setWithdrawAmount('');
        
        // Add to payment history
        setPaymentHistory(prev => [{
          batchId: data.payout.batch_id,
          amount: data.payout.amount,
          status: data.payout.status,
          date: new Date().toISOString(),
          receiver: data.payout.receiver
        }, ...prev]);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/withdraw/status/${batchId}`);
      const data = await response.json();
      
      if (data.status) {
        // Update the payment status in history
        setPaymentHistory(prev => prev.map(payment => 
          payment.batchId === batchId ? { ...payment, status: data.status } : payment
        ));
        
        return data.status;
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
    return null;
  };

  const handleViewDetails = async (payment) => {
    setSelectedPayment(payment);
    // Refresh status when viewing details
    const updatedStatus = await checkPaymentStatus(payment.batchId);
    if (updatedStatus) {
      setSelectedPayment(prev => ({ ...prev, status: updatedStatus }));
    }
  };
console.log("paymentHistory",paymentHistory);

  return (
    <div className="payment-dashboard">
      <h2 className="payment-title">Interviewer Dashboard</h2>
      
      <div className="balance-section">
        <p className="earnings-label">Available Balance:</p>
        <p className="earnings-amount">${earnings.toFixed(2)}</p>
      </div>

      <div className="withdraw-section">
        <label htmlFor="withdraw-amount" className="withdraw-label">
          Withdraw Amount:
        </label>
        <input
          id="withdraw-amount"
          type="number"
          className="withdraw-input"
          value={withdrawAmount}
          onChange={handleWithdrawChange}
          placeholder="0.00"
          step="0.01"
          min="0"
        />
        <button 
          className={`withdraw-button ${isLoading ? 'loading' : ''}`} 
          onClick={handleWithdraw}
          disabled={isLoading || !withdrawAmount}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Withdraw'
          )}
        </button>
      </div>

      {/* Payment History Section */}
      <div className="payment-history">
        <h3>Payment History</h3>
        {paymentHistory.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          <div className="payment-list">
            {paymentHistory.map((payment) => (
              <div 
                key={payment.batchId} 
                className={`payment-item ${payment.status?.toLowerCase()}`}
                onClick={() => handleViewDetails(payment)}
              >
                <div className="payment-info">
                  <span className="payment-amount">${payment.amount}</span>
                  <span className="payment-date">
                    {new Date(payment?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="payment-status">
                  <span className={`status-badge ${payment.status?.toLowerCase()}`}>
                    {payment.status || 'Pending'}
                  </span>
                  {payment.status === 'PENDING' && (
                    <button 
                      className="refresh-button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await checkPaymentStatus(payment.batchId);
                      }}
                    >
                      Refresh
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="payment-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedPayment(null)}
            >
              &times;
            </button>
            <h3>Payment Details</h3>
            <div className="detail-row">
              <span>Transaction ID:</span>
              <span>{selectedPayment.batchId}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span>${selectedPayment.amount}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className={`status-text ${selectedPayment.status?.toLowerCase()}`}>
                {selectedPayment.status || 'Pending'}
              </span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{new Date(selectedPayment.date).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Recipient:</span>
              <span>{selectedPayment.receiver}</span>
            </div>
            <div className="modal-actions">
              <button 
                className="status-button"
                onClick={async () => {
                  const updatedStatus = await checkPaymentStatus(selectedPayment.batchId);
                  if (updatedStatus) {
                    alert(`Status updated to: ${updatedStatus}`);
                  }
                }}
              >
                Check Status
              </button>
              <a
                href={`https://www.sandbox.paypal.com/payouts/status/${selectedPayment.batchId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-on-paypal"
              >
                View on PayPal
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerPaymentDashboard;
