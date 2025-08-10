import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import LoadingSpinner from "../common/LoadingSpinner";

function TimelineFormatter({ information }) {
  return information.map((info, i) => (
    <div key={i}>
      <div className="bg-transparent flex flex-row items-start m-[13px] rounded-md">
        <div className="bg-transparent flex flex-col items-center z-10">
          <img
            className="rounded-full border border-gray-600"
            src={info.icon_path}
            alt="logo"
            height={46}
            width={46}
          />
        </div>

        <div className="bg-transparent flex flex-col w-[90%] pl-4">
          <h3 className="bg-transparent text-xs font-extralight text-gray-400">
            {info.start_date} - {info.end_date || "Present"}
          </h3>
          <h1 className="bg-transparent font-bold text-white">{info.title}</h1>
          <h2 className="bg-transparent text-sm font-normal text-gray-300">
            {info.position}
          </h2>
          <ul className="bg-transparent list-disc pl-5">
            {info.description?.map((desc, index) => (
              <li
                className="bg-transparent text-sm font-light text-gray-300"
                key={index}
              >
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ));
}

function Timeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/timeline");
        const data = await res.json();
        setTimelineData(data);
      } catch (err) {
        console.error("Failed to fetch timeline data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  const experience = timelineData.filter(
    (item) => item.event_type === "experience"
  );
  const education = timelineData.filter(
    (item) => item.event_type === "education"
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Tabs.Root
      className="flex flex-col border border-gray-700 rounded-md w-full"
      defaultValue="tab1"
    >
      <Tabs.List className="flex shrink-0 border-b border-gray-700">
        <Tabs.Trigger
          className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-[#202020] px-5 text-[15px] leading-none text-gray-400 outline-none border border-gray-700 first:rounded-tl-md last:rounded-tr-md hover:text-violet-400 data-[state=active]:text-violet-400 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]"
          value="tab1"
        >
          Projects & Experience
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-[#202020] px-5 text-[15px] leading-none text-gray-400 outline-none border border-gray-700 first:rounded-tl-md last:rounded-tr-md hover:text-violet-400 data-[state=active]:text-violet-400 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]"
          value="tab2"
        >
          Education
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content
        className="grow rounded-b-md bg-[#202020] outline-none relative border border-gray-700"
        value="tab1"
      >
        <div className="absolute top-0 bottom-0 left-[35px] w-[2px] bg-gray-600"></div>
        <TimelineFormatter information={experience} />
      </Tabs.Content>

      <Tabs.Content
        className="grow rounded-b-md bg-[#202020] outline-none relative border border-gray-700"
        value="tab2"
      >
        <div className="absolute top-0 bottom-0 left-[35px] w-[2px] bg-gray-600"></div>
        <TimelineFormatter information={education} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default Timeline;
