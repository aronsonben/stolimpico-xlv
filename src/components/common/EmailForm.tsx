import React from "react";

function EmailForm() {
  const [result, setResult] = React.useState("");

  interface FormResponse {
    success: boolean;
    message: string;
  }

  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "deac3b35-d967-4fbc-9208-8fc2769c27aa");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data: FormResponse = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" required/>
        <input type="email" name="email" required/>
        <textarea name="message" required></textarea>

        <button type="submit">Submit Form</button>

      </form>
      <span>{result}</span>

    </div>
  );
}

export default EmailForm;