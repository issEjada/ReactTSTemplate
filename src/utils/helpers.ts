export const cleanObject = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "string" && value.trim() !== "") {
        newObj[key] = value;
      } else if (typeof value === "number" && value !== 0) {
        newObj[key] = value;
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const cleanedSubObject = cleanObject(value as object);
        if (Object.keys(cleanedSubObject).length > 0) {
          newObj[key] = cleanedSubObject as T[Extract<keyof T, string>];
        }
      }
    }
  }
  return newObj;
};

export function formatTime(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so we add 1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTimeWithNoOffset(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatFromTime(dateString: string): string {
  const date = new Date(decodeURIComponent(dateString));

  if (isNaN(date.getTime())) {
    return ""; // Return empty string for invalid date
  }

  date.setHours(0, 0, 0, 0); // Set to 00:00:00.000
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const sign = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = String(
    Math.abs(Math.floor(timezoneOffset / 60))
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");

  const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;

  return formattedTime;
}

export function formatToTime(dateString: string): string {
  const date = new Date(decodeURIComponent(dateString));
  if (isNaN(date.getTime())) {
    return ""; // Return empty string for invalid date
  }
  date.setHours(23, 59, 59, 999); // Set to 23:59:59.999
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const sign = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = String(
    Math.abs(Math.floor(timezoneOffset / 60))
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");

  const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;

  return formattedTime;
}

export function extractDateAndTime(dateString: string): {
  date: string;
  time: string;
} {
  const date = new Date(dateString);

  // Date part (DD/MM/YYYY)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Time part (hh:mm:ss AM/PM)
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12, 13 -> 1, etc.
  const formattedTime = `${String(hours).padStart(
    2,
    "0"
  )}:${minutes}:${seconds} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
