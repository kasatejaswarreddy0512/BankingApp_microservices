import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsByUserId } from "../Redux-Toolkit/AccountSlice";

const Account = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((store) => store.account);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.id) {
      const token = localStorage.getItem("token");
      dispatch(getAccountsByUserId({ userId: user.id, token }));
    }
  }, [dispatch, user]);

  if (loading) return <p style={{ color: "#fff", padding: 12 }}>Loading account details...</p>;
  if (error) return <p style={{ color: "#ff5a5a", padding: 12 }}>Error: {error}</p>;

  const account = accounts?.[0];

  const styles = {
    card: {
      width: "100%",
      maxWidth: 880,
      margin: "20px auto",
      marginLeft: "60px",
      padding: 22,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      display: "flex",
      gap: 10,
      alignItems: "stretch",
      color: "#fff",

    },
    left: {
      flex: 1,
      paddingRight: 12,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    sectionTitleGreen: {
      fontSize: 26,
      fontWeight: 800,
      margin: 0,
      color: "#22c55e",
      letterSpacing: 0.3,
    },
    sectionTitleBlue: {
      fontSize: 26,
      fontWeight: 800,
      margin: "10px 0 0",
      color: "#60a5fa",
      letterSpacing: 0.3,
    },
    block: {
      padding: 10,
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.18)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      gap: 1,
      padding: "8px 0",
      borderBottom: "1px dashed rgba(255,255,255,0.10)",
      fontSize: 14,
    },
    label: {
      opacity: 0.85,
      fontWeight: 700,
      letterSpacing: 0.2,
      whiteSpace: "nowrap",
    },
    value: {
      opacity: 0.95,
      fontWeight: 600,
      textAlign: "right",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    right: {
      width: 180,
      height: 470,
      minWidth: 340,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.18)",
    },
    img: {
      // width: "100%",
      maxWidth: 510,
      height: 470,
      borderRadius: 16,
      objectFit: "cover",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 2px 10px rgba(245, 245, 245, 0.5)",
    },
    noImg: {
      width: 320,
      height: 320,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "rgba(255,255,255,0.75)",
      fontWeight: 700,
      letterSpacing: 0.3,
    },
    note: { opacity: 0.8, fontSize: 14, margin: 0 },
  };

  const Row = ({ k, v, last }) => (
    <div style={{ ...styles.row, borderBottom: last ? "none" : styles.row.borderBottom }}>
      <span style={styles.label}>{k}</span>
      <span style={styles.value}>{v}</span>
    </div>
  );

  return (
    <div style={styles.card}>
      {/* Left */}
      <div style={styles.left}>
        <h2 style={styles.sectionTitleGreen}>Account Details</h2>

        {account ? (
          <div style={styles.block}>
            <Row k="Bank Name" v={account.bankName || "N/A"} />
            <Row k="Account Number" v={account.accountNumber} />
            <Row k="Account Type" v={account.accountType} />
            <Row k="IFSC Code" v={account.ifscCode} />
            <Row k="UPI" v={account.upi || "N/A"} />
            <Row k="Balance" v={`₹${account.balance}`} />

          </div>
        ) : (
          <p style={styles.note}>No account details available.</p>
        )}

        <h2 style={styles.sectionTitleBlue}>User Details</h2>

        <div style={styles.block}>
          <Row k="Name" v={user?.fullName || "N/A"} />
          <Row k="Email" v={user?.email || "N/A"} />
          <Row k="Phone" v={user?.phoneNumber || "N/A"} last />
        </div>
      </div>

      {/* Right */}
      <div style={styles.right}>
        {user?.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="Profile" style={styles.img} />
        ) : (
          <div style={styles.noImg}>No Image</div>
        )}
      </div>
    </div>
  );
};

export default Account;