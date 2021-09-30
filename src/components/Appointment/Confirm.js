import React from "react";

export default function Confirm() {
  const { message, onConfirm, onCancel } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button dange onClick={onConfirm}r>Confirm</Button>
      </section>
    </main>
  );
}
