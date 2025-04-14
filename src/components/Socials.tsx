import * as Toolbar from "@radix-ui/react-toolbar";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

function Socials() {
  return (
    <>
      <Toolbar.Root
        className="flex w-full min-w-max rounded-md justify-center md:justify-normal"
        aria-label="socialsToolbar"
      >
        <Toolbar.ToggleGroup type="single" aria-label="socialButtons">
          <a
            href="https://www.linkedin.com/in/justinveltri/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5 inline-flex h-[45px] w-[45px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none text-white outline-none first:ml-0 opacity-60 hover:opacity-100 focus:relative "
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon className="w-[40px] h-[40px]" />
          </a>
          <a
            href="https://github.com/Justinv1234"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5 inline-flex h-[45px] w-[45px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none text-white outline-none first:ml-0 opacity-60 hover:opacity-100 focus:relative"
            aria-label="Github"
          >
            <GitHubLogoIcon className="w-[40px] h-[40px]" />
          </a>
          <a
            href="mailto:justinveltri2005@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5 inline-flex h-[45px] w-[45px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none text-white outline-none first:ml-0 opacity-60 hover:opacity-100 focus:relative"
            aria-label="Email"
          >
            <EnvelopeClosedIcon className="w-[40px] h-[40px]" />
          </a>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </>
  );
}

export default Socials;
