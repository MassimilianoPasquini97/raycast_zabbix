import { Icon, List } from "@raycast/api";

export function GetProblemDuration(clock: number): string {
  const timeProblem = new Date(clock * 1000);
  const timeNow = new Date();

  let years = timeNow.getFullYear() - timeProblem.getFullYear();
  let months = timeNow.getMonth() - timeProblem.getMonth();
  let days = timeNow.getDate() - timeProblem.getDate();
  let hours = timeNow.getHours() - timeProblem.getHours();
  let minutes = timeNow.getMinutes() - timeProblem.getMinutes();
  let seconds = timeNow.getSeconds() - timeProblem.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(timeNow.getFullYear(), timeNow.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  let output = "";
  if (years > 0) output += `${years}y, `;
  if (months > 0) output += `${months}M, `;
  if (days > 0) output += `${days}d, `;
  if (hours > 0 && years === 0) output += `${hours}h, `;
  if (minutes > 0 && months + years === 0) output += `${minutes}m, `;
  if (seconds > 0 && hours + days + months + years === 0)
    output += `${seconds}s, `;
  return output.slice(0, -2);
}

export function GetAccessorySeverity(
  severity: number,
  value: string,
): List.Item.Accessory | undefined {
  const accessory: List.Item.Accessory[] = [
    {
      tag: { value: value, color: { light: "#97AAB3", dark: "#97AAB3" } },
      icon: Icon.Info,
      tooltip: "Not Classified",
    },
    {
      tag: { value: value, color: { light: "#7499FF", dark: "#7499FF" } },
      icon: Icon.Info,
      tooltip: "Information",
    },
    {
      tag: { value: value, color: { light: "#FFC859", dark: "#FFC859" } },
      icon: Icon.Warning,
      tooltip: "Warning",
    },
    {
      tag: { value: value, color: { light: "#FFA059", dark: "#FFA059" } },
      icon: Icon.Warning,
      tooltip: "Average",
    },
    {
      tag: { value: value, color: { light: "#E9765A", dark: "#E9765A" } },
      icon: Icon.XMarkCircle,
      tooltip: "High",
    },
    {
      tag: { value: value, color: { light: "#E45959", dark: "#E45959" } },
      icon: Icon.XMarkCircle,
      tooltip: "Disaster",
    },
  ];
  return accessory.at(severity);
}
