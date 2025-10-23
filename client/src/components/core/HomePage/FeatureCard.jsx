const FeatureCard = ({
  title,
  description,
  icon: IconComponent,
  accentColor,
}) => {
  const getAccentClasses = (color) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          hoverBorder: "hover:border-blue-500",
          shadow: "shadow-blue-200",
        };
      case "pink":
        return {
          bg: "bg-pink-100",
          text: "text-pink-600",
          hoverBorder: "hover:border-pink-500",
          shadow: "shadow-pink-200",
        };
      case "green":
        return {
          bg: "bg-caribbeangreen-100",
          text: "text-caribbeangreen-600",
          hoverBorder: "hover:border-caribbeangreen-500",
          shadow: "shadow-caribbeangreen-200",
        };
      default:
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          hoverBorder: "hover:border-blue-500",
          shadow: "shadow-blue-200",
        };
    }
  };

  const accentClasses = getAccentClasses(accentColor);

  return (
    <div
      className={`
        relative
        flex flex-col items-center text-center
        p-6 sm:p-8
        bg-white
        rounded-xl
        shadow-lg ${accentClasses.shadow}
        border border-gray-200
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-2 ${accentClasses.hoverBorder} hover:shadow-xl
        cursor-pointer
        h-full
      `}
    >
      <div
        className={`
        ${accentClasses.bg}
        p-3
        rounded-full
        mb-4
        flex items-center justify-center
        w-16 h-16
      `}
      >
        {IconComponent && (
          <IconComponent className={`w-8 h-8 ${accentClasses.text}`} />
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-base mb-4 flex-grow">{description}</p>

      <a
        href="/signup"
        className={`
          flex items-center
          font-semibold ${accentClasses.text}
          hover:underline
          transition-colors duration-200
          mt-auto 
        `}
      >
        Learn More
        <svg
          className={`ml-2 w-4 h-4 ${accentClasses.text}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default FeatureCard;
