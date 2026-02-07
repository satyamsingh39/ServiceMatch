const Accessibility = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          We are committed to making our website accessible to everyone, including people with disabilities.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
        <p className="mb-4">
          We strive to ensure that our website is accessible to all users, regardless of their abilities or the assistive technologies they use.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Accessibility Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Keyboard navigation support</li>
          <li>Screen reader compatibility</li>
          <li>High contrast options</li>
          <li>Alternative text for images</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-3">Feedback</h2>
        <p className="mb-4">
          If you encounter any accessibility issues or have suggestions for improvement, please contact us.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
        <p className="mb-4">
          For accessibility-related questions or concerns, please reach out to our support team.
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
