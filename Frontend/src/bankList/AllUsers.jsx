import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../Redux-Toolkit/AccountSlice";
import { getuserProfileList } from "../Redux-Toolkit/AuthSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((store) => store.account);
  const { users } = useSelector((store) => store.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAllAccounts(token));
      dispatch(getuserProfileList(token));
    }
  }, [dispatch]);

  if (loading)
    return <p style={{ color: "#fff", padding: 12 }}>Loading users...</p>;

  if (error)
    return <p style={{ color: "#ff5a5a", padding: 12 }}>Error: {error}</p>;

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 12,
      padding: 20,
      marginLeft: 50,
    },
    card: {
      padding: 10,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      display: "flex",
      gap: 25,
      alignItems: "center",
      color: "#fff",

    },
    left: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    sectionTitleGreen: {
      fontSize: 20,
      fontWeight: 800,
      margin: 0,
      color: "#22c55e",
    },
    block: {
      padding: 7,
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.18)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1px 0",
      borderBottom: "1px dashed rgba(255,255,255,0.10)",
      fontSize: 14,
    },
    label: { fontWeight: 700 },
    value: { fontWeight: 600 },
    right: {
      width: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 160,
      height: 160,
      borderRadius: 16,
      objectFit: "cover",
      border: "1px solid rgba(255,255,255,0.18)",
    },
    noImg: {
      width: 120,
      height: 120,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "rgba(255,255,255,0.75)",
      fontWeight: 700,
    },
    buttonContainer: {
      display: "flex",
      gap: 10,
      marginTop: 10,
    },
    updateBtn: {
      padding: "6px 14px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      backgroundColor: "#2563eb",
      color: "white",
    },
    deleteBtn: {
      padding: "6px 14px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      backgroundColor: "#dc2626",
      color: "white",

    },
  };

  const Row = ({ k, v, last }) => (
    <div
      style={{
        ...styles.row,
        borderBottom: last ? "none" : styles.row.borderBottom,
      }}
    >
      <span style={styles.label}>{k}</span>
      <span style={styles.value}>{v}</span>
    </div>
  );

  return (
    <div style={styles.container}>
      {accounts && accounts.length > 0 ? (
        accounts.map((account) => {
          // 🔥 Match user for this account
          const matchedUser = users?.find(
            (u) => u.id === account.userId
          );

          return (
            <div style={styles.card} key={account.id}>

              {/* LEFT SIDE IMAGE */}
              <div style={styles.right}>
                {matchedUser?.profilePictureUrl ? (
                  <img
                    src={matchedUser.profilePictureUrl}
                    alt="Profile"
                    style={styles.img}
                  />
                ) : (
                  <div style={styles.noImg}>No Image</div>
                )}
              </div>

              {/* RIGHT SIDE DETAILS */}
              <div style={styles.left}>
                <h3 style={styles.sectionTitleGreen}>Account Details</h3>

                <div style={styles.block}>
                  <Row k="Name : " v={matchedUser?.fullName || "N/A"} />
                  <Row k="Account Number : " v={account.accountNumber} />
                  <Row k="Balance : " v={`₹${account.balance}`} last />
                </div>

                <div style={styles.buttonContainer}>
                  <button style={styles.updateBtn}>Update</button>
                  <button style={styles.deleteBtn}>Delete</button>
                </div>

              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: "#fff" }}>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;







// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAccountsByUserId, getAllAccounts } from "../Redux-Toolkit/AccountSlice";

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const { accounts, loading, error } = useSelector((store) => store.account);
//   const { user } = useSelector((store) => store.auth);

//   useEffect(() => {
//     if (user?.id) {
//       const token = localStorage.getItem("token");
//       dispatch(getAllAccounts(token));
//     }
//   }, [dispatch, user]);

//   if (loading)
//     return <p style={{ color: "#fff", padding: 12 }}>Loading users...</p>;
//   if (error)
//     return <p style={{ color: "#ff5a5a", padding: 12 }}>Error: {error}</p>;

//   const styles = {
//     container: {
//       display: "grid",
//       gridTemplateColumns: "repeat(2, 1fr)", // 🔥 Two cards per row
//       gap: 20,
//       padding: 20,
//     },
//     card: {
//       padding: 20,
//       borderRadius: 18,
//       border: "1px solid rgba(255,255,255,0.18)",
//       background: "rgba(255,255,255,0.06)",
//       backdropFilter: "blur(10px)",
//       boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
//       display: "flex",
//       gap: 18,
//       alignItems: "stretch",
//       color: "#fff",
//     },
//     left: {
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       gap: 14,
//     },
//     sectionTitleGreen: {
//       fontSize: 20,
//       fontWeight: 800,
//       margin: 0,
//       color: "#22c55e",
//     },
//     sectionTitleBlue: {
//       fontSize: 20,
//       fontWeight: 800,
//       margin: "10px 0 0",
//       color: "#60a5fa",
//     },
//     block: {
//       padding: 14,
//       borderRadius: 14,
//       border: "1px solid rgba(255,255,255,0.12)",
//       background: "rgba(0,0,0,0.18)",
//     },
//     row: {
//       display: "flex",
//       justifyContent: "space-between",
//       padding: "6px 0",
//       borderBottom: "1px dashed rgba(255,255,255,0.10)",
//       fontSize: 14,
//     },
//     label: { fontWeight: 700 },
//     value: { fontWeight: 600 },
//     right: {
//       width: 180,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     img: {
//       width: 100,
//       height: 100,
//       borderRadius: 16,
//       objectFit: "cover",
//       border: "1px solid rgba(255,255,255,0.18)",
//     },
//     noImg: {
//       width: 150,
//       height: 150,
//       borderRadius: 16,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "rgba(255,255,255,0.08)",
//       border: "1px solid rgba(255,255,255,0.18)",
//       color: "rgba(255,255,255,0.75)",
//       fontWeight: 700,
//     },
//   };

//   const Row = ({ k, v, last }) => (
//     <div
//       style={{
//         ...styles.row,
//         borderBottom: last ? "none" : styles.row.borderBottom,
//       }}
//     >
//       <span style={styles.label}>{k}</span>
//       <span style={styles.value}>{v}</span>
//     </div>
//   );

//   return (
//     <div style={styles.container}>
//       {accounts && accounts.length > 0 ? (
//         accounts.map((account) => (
//           <div style={styles.card} key={account.id}>
//             {/* Left */}
//             <div style={styles.left}>
//               <h3 style={styles.sectionTitleGreen}>Account Details</h3>
//               <div style={styles.block}>
//                 <Row k="Name" v={user?.fullName || "N/A"} />
//                 <Row k="Account Number" v={account.accountNumber} />
//                 <Row k="Balance" v={`₹${account.balance}`} last />
//               </div>

//               {/* <h3 style={styles.sectionTitleBlue}>User Details</h3>
//               <div style={styles.block}>

//                 <Row k="Email" v={user?.email || "N/A"} />
//                 <Row k="Phone" v={user?.phoneNumber || "N/A"} last />
//               </div> */}
//             </div>

//             {/* Right */}
//             <div style={styles.right}>
//               {user?.profilePictureUrl ? (
//                 <img
//                   src={user.profilePictureUrl}
//                   alt="Profile"
//                   style={styles.img}
//                 />
//               ) : (
//                 <div style={styles.noImg}>No Image</div>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p style={{ color: "#fff" }}>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default AllUsers;