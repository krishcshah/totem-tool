// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LandingPage } from "../LandingPage";
import App from "../../App";

describe("LandingPage Component Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders the primary H1 headline and key value proposition", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("See the process");
    expect(h1.textContent).toContain("between the objects.");

    expect(
      screen.getByText(
        /TOTeM turns OCEL 2.0 event data into process areas, variants, object-centric models, and conformance evidence/i
      )
    ).toBeTruthy();
  });

  it("renders external GitHub link with safe rel and blank target attributes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const githubLinks = screen.getAllByRole("link", { name: /github|view source/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    const mainGithubLink = githubLinks[0];
    expect(mainGithubLink.getAttribute("target")).toBe("_blank");
    expect(mainGithubLink.getAttribute("rel")).toContain("noreferrer");
    expect(mainGithubLink.getAttribute("href")).toBe("https://github.com/LukasLiss/totem-tool");
  });

  it("renders prominent GitHub CTA links that direct users to the repository", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const ctaLinks = screen.getAllByRole("link", { name: /explore on github|github/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => {
      expect(link.getAttribute("href")).toBe("https://github.com/LukasLiss/totem-tool");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    });
  });

  it("operates model formalisms tablist with keyboard arrow keys", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const tabList = screen.getByRole("tablist", {
      name: /Object-Centric Process Mining Model Languages/i,
    });
    expect(tabList).toBeTruthy();

    const totemTab = screen.getByRole("tab", { name: /totem/i });
    const ocdfgTab = screen.getByRole("tab", { name: /oc-dfg/i });
    const ocpnTab = screen.getByRole("tab", { name: /ocpn/i });
    const occnTab = screen.getByRole("tab", { name: /occn/i });

    expect(totemTab.getAttribute("aria-selected")).toBe("true");

    // Navigate right: TOTeM -> OC-DFG
    totemTab.focus();
    fireEvent.keyDown(totemTab, { key: "ArrowRight" });
    expect(ocdfgTab.getAttribute("aria-selected")).toBe("true");

    // Navigate right: OC-DFG -> OCPN
    fireEvent.keyDown(ocdfgTab, { key: "ArrowRight" });
    expect(ocpnTab.getAttribute("aria-selected")).toBe("true");

    // Navigate right: OCPN -> OCCN
    fireEvent.keyDown(ocpnTab, { key: "ArrowRight" });
    expect(occnTab.getAttribute("aria-selected")).toBe("true");

    // Wrap around to start: OCCN -> TOTeM
    fireEvent.keyDown(occnTab, { key: "ArrowRight" });
    expect(totemTab.getAttribute("aria-selected")).toBe("true");
  });

  it("provides accessible aria-pressed state on perspective comparison controls", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const flattenedBtn = screen.getByRole("button", { name: /flattened case view/i });
    const objectCentricBtn = screen.getByRole("button", { name: /object-centric view/i });

    expect(objectCentricBtn.getAttribute("aria-pressed")).toBe("true");
    expect(flattenedBtn.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(flattenedBtn);
    expect(flattenedBtn.getAttribute("aria-pressed")).toBe("true");
    expect(objectCentricBtn.getAttribute("aria-pressed")).toBe("false");
  });

  it("toggles the FAQ accordion on click and updates aria-expanded", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const questionBtn = screen.getByRole("button", {
      name: /What is an OCEL\?/i,
    });
    expect(questionBtn.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(questionBtn);
    expect(questionBtn.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(/An Object-Centric Event Log \(OCEL 2.0\) is an open standard/i)).toBeTruthy();

    fireEvent.click(questionBtn);
    expect(questionBtn.getAttribute("aria-expanded")).toBe("false");
  });

  it("does not render desktop download link when VITE_DESKTOP_DOWNLOAD_URL is unset", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.queryByRole("link", { name: /download desktop/i })).toBeNull();
  });

  it("renders desktop download link when VITE_DESKTOP_DOWNLOAD_URL is configured", () => {
    const originalEnv = import.meta.env.VITE_DESKTOP_DOWNLOAD_URL;
    import.meta.env.VITE_DESKTOP_DOWNLOAD_URL = "https://github.com/LukasLiss/totem-tool/releases/latest";

    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const downloadLinks = screen.getAllByRole("link", { name: /download desktop/i });
    expect(downloadLinks.length).toBeGreaterThan(0);
    expect(downloadLinks[0].getAttribute("href")).toBe(
      "https://github.com/LukasLiss/totem-tool/releases/latest"
    );

    import.meta.env.VITE_DESKTOP_DOWNLOAD_URL = originalEnv;
  });

  it("handles prefers-reduced-motion without errors and shows resolved wordmark", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Temporal Object Type Model/i).length).toBeGreaterThan(0);
  });

  it("switches workflow stages when stage tab buttons are clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    // Initial stage 01
    expect(screen.getByText("Bring the object-centric log.")).toBeTruthy();

    // Click stage 03 DISCOVER & EXTRACT
    const discoverBtn = screen.getByRole("button", { name: /03 DISCOVER & EXTRACT/i });
    fireEvent.click(discoverBtn);

    expect(
      screen.getByText("Reveal executions, variants, and models.")
    ).toBeTruthy();
  });

  it("copies pip install command when copy button is clicked", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const copyBtns = screen.getAllByRole("button", { name: /copy pip install command/i });
    expect(copyBtns.length).toBeGreaterThan(0);
    fireEvent.click(copyBtns[0]);

    expect(writeTextMock).toHaveBeenCalledWith("pip install totem-tool");
  });

  it("allows clicking events in HeroProcessMap to display inspection details", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const pickItemsEvent = screen.getByRole("button", {
      name: /Event: Pick Items at 10:22:15/i,
    });
    expect(pickItemsEvent).toBeTruthy();

    fireEvent.click(pickItemsEvent);

    expect(
      screen.getByText(/Operator W-14 claims picking wave for items i-01, i-02/i)
    ).toBeTruthy();

    const clearPinBtn = screen.getByRole("button", { name: /clear event pin/i });
    expect(clearPinBtn).toBeTruthy();
    fireEvent.click(clearPinBtn);

    expect(
      screen.getByText(/Interactive map: hover or click events or object chips/i)
    ).toBeTruthy();
  });

  it("toggles between SQL code and results in the DuckDB Workbench widget", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/activity, count\(\*\) AS event_count/i)).toBeTruthy();

    const resultsBtn = screen.getByRole("button", { name: /Results \(5 rows\)/i });
    fireEvent.click(resultsBtn);

    expect(screen.getByText(/⚡ Executed in 4.2ms · 5 rows returned/i)).toBeTruthy();
    expect(screen.getByText("12,840")).toBeTruthy();

    const sqlBtn = screen.getByRole("button", { name: /SQL Query/i });
    fireEvent.click(sqlBtn);

    expect(screen.getByText(/activity, count\(\*\) AS event_count/i)).toBeTruthy();
  });

  it("renders OC-DFG diagram with SVG arrow markers when selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    const ocdfgTab = screen.getByRole("tab", { name: /oc-dfg/i });
    fireEvent.click(ocdfgTab);

    const svg = screen.getByRole("img", {
      name: /Object-Centric Directly Follows Graph with multi-type edge routing/i,
    });
    expect(svg).toBeTruthy();
    expect(svg.querySelector("#arrow-blue")).toBeTruthy();
    expect(svg.querySelector("#arrow-purple")).toBeTruthy();
    expect(svg.querySelector("#arrow-teal")).toBeTruthy();
  });

  it("renders AI Copilot section with interactive Teach and Act modes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LandingPage />
      </MemoryRouter>
    );

    // Verify section heading and eyebrow badge
    expect(
      screen.getByRole("heading", { level: 2, name: /Process intelligence meets autonomous action\./i })
    ).toBeTruthy();
    expect(screen.getByText(/DUAL-MODE AI COPILOT & AGENT BRIDGE/i)).toBeTruthy();

    // Verify default Teach Mode state
    expect(screen.getByText(/Teach Mode is active:/i)).toBeTruthy();
    expect(screen.getByText(/Unlike classic Petri nets where tokens are anonymous black dots/i)).toBeTruthy();
    expect(screen.getByText(/Spotlight Active: Model Discovery Studio/i)).toBeTruthy();

    // Switch to Act Mode
    const actModeTab = screen.getByRole("tab", { name: /act mode/i });
    fireEvent.click(actModeTab);

    // Verify Act Mode state and MCP tools
    expect(screen.getByText(/Act Mode is active:/i)).toBeTruthy();
    expect(screen.getByText(/MCP Tool Invocation Pipeline/i)).toBeTruthy();
    expect(screen.getByText(/discover_occn\(dependency_threshold=0.9, noise_tolerance=0.05\)/i)).toBeTruthy();

    // Test Human-in-the-Loop approval
    const approveBtn = screen.getByRole("button", { name: /approve action/i });
    expect(approveBtn).toBeTruthy();
    fireEvent.click(approveBtn);

    expect(screen.getByText(/Approved & Applied/i)).toBeTruthy();
    expect(screen.getByText(/Dashboard mounted to active workspace/i)).toBeTruthy();
  });
});

describe("Routing Integration in App", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders LandingPage on '/' in hosted mode", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", { level: 1, name: /See the process between the objects\./i })
    ).toBeTruthy();
  });

  it("renders LandingPage on '/title' in hosted mode for backward compatibility", async () => {
    render(
      <MemoryRouter initialEntries={["/title"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", { level: 1, name: /See the process between the objects\./i })
    ).toBeTruthy();
  });
});
