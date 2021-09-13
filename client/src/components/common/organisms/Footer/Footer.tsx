export const Footer = () => {
  return (
    <footer
      style={{ position: `sticky` }}
      className="laptop:flex laptop:items-center laptop:justify-around py-6 text-lg bg-main"
    >
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img
          src="/NearCelebLetter.svg"
          alt="white-logo"
          className="tablet:w-14 w-8 tablet:h-10 h-8"
        />
        <h1 className="ml-8 text-white font-extralight">
          &copy; Near Celeb. All right reserved.
        </h1>
      </div>
      {/* Footer Menu */}
      <div className="flex items-center justify-center tablet:mt-0 mt-3 text-white tablet:text-lg text-sm font-light">
        <h3>ABOUT</h3>
        <h3 className="mx-2 tablet:mx-6">|</h3>
        <h3>BLOG</h3>
        <h3 className="mx-2 tablet:mx-6">|</h3>
        <h3>CONTACT</h3>
        <h3 className="mx-2 tablet:mx-6">|</h3>
        <h3>PRIVACY</h3>
        <h3 className="mx-2 tablet:mx-6">|</h3>
        <h3>HELP</h3>
      </div>
    </footer>
  );
};
