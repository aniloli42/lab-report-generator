export const Footer = () => {
  return (
    <footer className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-600 text-center text-white">
      2021 - {new Date().getFullYear()} &copy; Lab Report Generator -{" "}
      <a
        href="https://aniloli42.me"
        target="_blank"
        rel="noopenner nofollow"
        className="link"
        title="Open Anil Oli's Website"
      >
        Anil Oli
      </a>
    </footer>
  );
};
