export function ContactTemplate({
  name,
  email,
  phoneNumber,
  subject,
  message,
}: {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}) {
  return `<div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "25px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "22px",
            color: "#333",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
          }}
        >
          📩 New Contact Form Submission
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#555" }}>Name:</strong>
          <p style={{ margin: "5px 0 15px" }}>${name}</p>

          <strong style={{ color: "#555" }}>Phone Number:</strong>
          <p style={{ margin: "5px 0 15px" }}>${phoneNumber}</p>

          <strong style={{ color: "#555" }}>Email:</strong>
          <p style={{ margin: "5px 0 15px" }}>${email}</p>

          <strong style={{ color: "#555" }}>Subject:</strong>
          <p style={{ margin: "5px 0 15px" }}>${subject}</p>

          <strong style={{ color: "#555" }}>Message:</strong>
          <p
            style={{
              margin: "10px 0 0",
              whiteSpace: "pre-line",
              lineHeight: "1.6",
              color: "#333",
            }}
          >
            ${message}
          </p>
        </div>
      </div>
    </div>`;
}
