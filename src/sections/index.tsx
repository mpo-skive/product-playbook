import type { ComponentType } from "react";
import type { SectionId } from "@/content/meta";
import type { SectionProps } from "./_shell";
import Home from "./Home";
import Why from "./Why";
import Principles from "./Principles";
import Problems from "./Problems";
import Team from "./Team";
import Test from "./Test";
import Modernise from "./Modernise";
import Govern from "./Govern";
import Tools from "./Tools";
import Start from "./Start";
import Glossary from "./Glossary";

export const SECTION_COMPONENTS: Record<SectionId, ComponentType<SectionProps>> = {
  home: Home,
  why: Why,
  principles: Principles,
  problems: Problems,
  team: Team,
  test: Test,
  modernise: Modernise,
  govern: Govern,
  tools: Tools,
  start: Start,
  glossary: Glossary,
};
