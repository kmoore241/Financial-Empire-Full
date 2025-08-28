#!/usr/bin/env node

console.log("🚀 Welcome to the Lunara CLI!");

const [,, ...args] = process.argv;

if (args[0] === "hello") {
  console.log("Hello from the Financial Empire/Lunara CLI!");
} else if (args[0] === "setup") {
  console.log("Running setup tasks...");
  // Add custom setup logic here
} else {
  console.log("Usage: npx lunara-cli <command>");
  console.log("Available commands: hello, setup");
}
