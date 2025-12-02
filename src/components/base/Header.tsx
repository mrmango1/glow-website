import React, { useState, useEffect } from "react";
import { IoSync, IoBatteryFull, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import GlassFiltersSVG from "./GlassFiltersSVG";

interface Props {
  pathname: string;
  base?: string;
}

const Header: React.FC<Props> = ({ pathname, base = "" }) => {
  const [currentStyle, setCurrentStyle] = useState<"no-shape" | "full" | "split">("split");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [iconsVisible, setIconsVisible] = useState<boolean>(true);

  const stickyHeader = true;

  const menu = [
    {
      name: "Glow",
      url: `${base}/`,
    },
    {
      name: "Features",
      url: `${base}/features`,
    },
    {
      name: "FAQ",
      url: `${base}/faq`,
    },
    {
      name: "Changelog",
      url: `${base}/changelog`,
    },
  ];

  // Define classes based on currentStyle with liquid glass border effects
  const headerClasses = {
    "no-shape": "w-full py-1 bg-transparent glass-borderless glass-bar-font outline outline-1 outline-border z-30",
    "full": `mx-1 my-[3px] px-4 py-1 glass-liquid glass-bar-font z-30 rounded-3xl ${stickyHeader ? "sticky top-0" : ""}`,
    "split": `mx-1 my-[3px] z-30 ${stickyHeader ? "sticky top-0" : ""}`
  };

  const navClasses = {
    "no-shape": "relative mx-[1px] px-5 flex flex-wrap items-center justify-between",
    "full": "relative flex flex-wrap items-center justify-between",
    "split": "relative flex items-stretch justify-between"
  };

  const handleStyleToggle = () => {
    const styles: ("no-shape" | "full" | "split")[] = ["no-shape", "full", "split"];
    const index = styles.indexOf(currentStyle);
    setCurrentStyle(styles[(index + 1) % styles.length]);
  };

  const getTheme = (defaultTheme: string) => {
    var darkMode = defaultTheme === "dark" ? true : false;
    if (localStorage.getItem("theme") === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkMode = true;
      }
    } else if (localStorage.getItem("theme") === "dark") {
      darkMode = true;
    } else if (localStorage.getItem("theme") === "light") {
      darkMode = false;
    }
    return darkMode;
  };

  const setTheme = (darkMode: boolean) => {
    // Update DOM
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Update localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const defaultTheme = "system";
    // This prevents flickering back to default theme before the page is fully loaded
    setTheme(getTheme(defaultTheme));
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const day = now.getDate();
      let hour = now.getHours();
      const minute = now.getMinutes().toString().padStart(2, '0');
      const isPM = hour >= 12;
      hour = hour % 12;
      if (hour === 0) hour = 12;
      const ampm = isPM ? 'p.m.' : 'a.m.';
      setCurrentTime(`${weekday} ${month} ${day} ${hour}:${minute} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleIcons = () => setIconsVisible((v) => !v);

  return (
    <>
      {/* SVG Filters for liquid glass distortion effects (optional) */}
      <GlassFiltersSVG />

      <header className={headerClasses[currentStyle]}>
        <nav className={navClasses[currentStyle]}>
        {currentStyle === "split" ? (
          <>
            {/* Left section: Menu */}
            <div className="flex items-center justify-start glass-liquid glass-bar-font rounded-3xl px-4 py-1 flex-shrink-0">
              {/* navbar toggler */}
              <input id="nav-toggle" type="checkbox" className="hidden" />
              <label
                htmlFor="nav-toggle"
                className="order-0 cursor-pointer flex items-center md:hidden text-txt-p dark:text-darkmode-txt-p mr-2"
              >
                <svg id="show-button" className="h-6 fill-current block" viewBox="0 0 20 20">
                  <title>Menu Open</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                </svg>
                <svg id="hide-button" className="h-6 fill-current hidden" viewBox="0 0 20 20">
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"></polygon>
                  </svg>
              </label>
              {/* /navbar toggler */}
              <div className="flex items-center order-1">
                <FaApple className="mr-2 pb-[1px] text-xl text-black dark:text-white" />
                <ul
                  id="nav-menu"
                  className="text-left hidden w-full pb-6 md:flex md:w-auto md:space-x-0 md:pb-0 lg:space-x-2"
                >
                  {menu.map((item, index) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        className={`block py-1 px-2 ${index === 0 ? 'menu-title font-semibold' : 'menu-item'} text-[13px] text-txt-p transition dark:text-darkmode-txt-p lg:px-2 ${
                          (pathname === `${item.url}/` || pathname === item.url) ? "active" : ""
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Right section: Theme */}
            <div className="flex items-center justify-end glass-liquid glass-bar-font rounded-3xl px-4 py-1">
              <div className={iconsVisible ? "flex items-center" : "hidden"}>
                <div className="inline-flex">
                  <input
                    className="absolute opacity-0"
                    id="theme-switcher"
                    data-theme-switcher
                    type="checkbox"
                    onChange={(e) => setTheme(e.target.checked)}
                  />
                  <label
                    className="relative inline-block h-4 w-6 cursor-pointer"
                    htmlFor="theme-switcher"
                  >
                    <span className="sr-only">theme switcher</span>
                    <span
                      className="absolute -top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full"
                    >
                      {/* User-provided theme icon: uses currentColor and swaps via opacity with .dark */}
                      <svg
                        className="absolute z-10 opacity-100 dark:opacity-0 text-black dark:text-white"
                        viewBox="0 0 24 24"
                        height="21"
                        width="21"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                      </svg>
                      <svg
                        className="absolute z-10 opacity-0 dark:opacity-100 text-black dark:text-white"
                        viewBox="0 0 24 24"
                        height="21"
                        width="21"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                      </svg>
                    </span>
                  </label>
                </div>
                <button
                  onClick={handleStyleToggle}
                  className="ml-3 inline-block border-border text-xl text-txt-p dark:border-darkmode-border dark:text-darkmode-txt-p"
                  aria-label="toggle header style"
                >
                  <IoSync />
                </button>
              </div>
              <button
                onClick={toggleIcons}
                aria-expanded={iconsVisible}
                aria-label={iconsVisible ? "Ocultar iconos" : "Mostrar iconos"}
                className={iconsVisible ? "p-1 ml-3" : "p-1"}
              >
                {iconsVisible ? (
                  <IoChevronForward className="text-base opacity-80" />
                ) : (
                  <IoChevronBack className="text-base opacity-80" />
                )}
              </button>
              <div className="ml-2 flex items-center space-x-2 text-sm text-txt-p dark:text-darkmode-txt-p z-20 relative">
                {/* Battery (always visible) */}
                <IoBatteryFull className="text-xl" />
                {/* Control Center Icon SVG - always visible */}
                <div className="pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 29 29"
                    id="control-centre"
                    width="16"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.5 13h14a5.5 5.5 0 0 0 0-11h-14a5.5 5.5 0 0 0 0 11Zm0-9h14a3.5 3.5 0 0 1 0 7h-14a3.5 3.5 0 0 1 0-7Zm0 6A2.5 2.5 0 1 0 5 7.5 2.5 2.5 0 0 0 7.5 10Zm14 6h-14a5.5 5.5 0 0 0 0 11h14a5.5 5.5 0 0 0 0-11Zm1.434 8a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5Z" />
                  </svg>
                </div>
                <span className="time-display pl-1 text-[13px]">{currentTime}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* navbar toggler */}
            <input id="nav-toggle" type="checkbox" className="hidden" />
            <label
              htmlFor="nav-toggle"
              className="order-0 cursor-pointer flex items-center md:hidden text-txt-p dark:text-darkmode-txt-p lg:order-1"
            >
              <svg id="show-button" className="h-6 fill-current block" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
              </svg>
              <svg id="hide-button" className="h-6 fill-current hidden" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"></polygon>
                </svg>
            </label>
            {/* /navbar toggler */}
            <div className="flex items-center order-1">
              <FaApple className="mr-2 pb-[1px] text-xl text-black dark:text-white" />
              <ul
                id="nav-menu"
                className="text-left hidden w-full pb-6 md:flex md:w-auto md:space-x-0 md:pb-0 lg:space-x-2"
              >
                {menu.map((item, index) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      className={`block py-1 px-2 ${index === 0 ? 'menu-title font-semibold' : 'menu-item'} text-[13px] text-txt-p transition dark:text-darkmode-txt-p lg:px-2 ${
                        (pathname === `${item.url}/` || pathname === item.url) ? "active" : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-2 ml-auto flex items-center md:order-2 lg:ml-0">
              <div className={iconsVisible ? "flex items-center" : "hidden"}>
                <div className="inline-flex">
                  <input
                    className="absolute opacity-0"
                    id="theme-switcher"
                    data-theme-switcher
                    type="checkbox"
                    onChange={(e) => setTheme(e.target.checked)}
                  />
                  <label
                    className="relative inline-block h-4 w-6 cursor-pointer"
                    htmlFor="theme-switcher"
                  >
                    <span className="sr-only">theme switcher</span>
                    <span
                      className="absolute -top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full"
                    >
                      {/* User-provided theme icon: uses currentColor and swaps via opacity with .dark */}
                      <svg
                        className="absolute z-10 opacity-100 dark:opacity-0 text-black dark:text-white"
                        viewBox="0 0 24 24"
                        height="21"
                        width="21"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                      </svg>
                      <svg
                        className="absolute z-10 opacity-0 dark:opacity-100 text-black dark:text-white"
                        viewBox="0 0 24 24"
                        height="21"
                        width="21"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                      </svg>
                    </span>
                  </label>
                </div>
                <button
                  onClick={handleStyleToggle}
                  className="ml-3 inline-block border-border text-xl text-txt-p dark:border-darkmode-border dark:text-darkmode-txt-p"
                  aria-label="toggle header style"
                >
                  <IoSync />
                </button>
              </div>
              <button
                onClick={toggleIcons}
                aria-expanded={iconsVisible}
                aria-label={iconsVisible ? "Ocultar iconos" : "Mostrar iconos"}
                className="p-1 ml-3"
              >
                {iconsVisible ? (
                  <IoChevronForward className="text-base opacity-80" />
                ) : (
                  <IoChevronBack className="text-base opacity-80" />
                )}
              </button>
              <div className="ml-2 flex items-center space-x-2 text-sm text-txt-p dark:text-darkmode-txt-p z-20 relative">
                {/* Battery (always visible) */}
                <IoBatteryFull className="text-xl" />
                {/* Control Center Icon SVG - always visible */}
                <div className="pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 29 29"
                    id="control-centre"
                    width="16"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.5 13h14a5.5 5.5 0 0 0 0-11h-14a5.5 5.5 0 0 0 0 11Zm0-9h14a3.5 3.5 0 0 1 0 7h-14a3.5 3.5 0 0 1 0-7Zm0 6A2.5 2.5 0 1 0 5 7.5 2.5 2.5 0 0 0 7.5 10Zm14 6h-14a5.5 5.5 0 0 0 0 11h14a5.5 5.5 0 0 0 0-11Zm1.434 8a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5Z" />
                  </svg>
                </div>
                <span className="time-display pl-1 text-[13px]">{currentTime}</span>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
    </>
  );
};

export default Header;
