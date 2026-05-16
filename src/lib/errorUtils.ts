export function getFriendlyErrorMessage(error: any): string {
  const message = error?.message || String(error);
  
  if (message.includes('Insufficient content')) {
    return "The provided text is too short. Please paste at least a paragraph of lecture material for better results.";
  }
  
  if (message.includes('fetch') || message.includes('Network Error') || message.includes('Failed to fetch')) {
    return "Check your internet connection and try again. If the issue persists, the AI service might be temporarily unavailable.";
  }
  
  if (message.includes('429') || message.includes('too many requests') || message.includes('Quota exceeded')) {
    return "We're receiving a lot of requests right now. Please wait a minute before trying again.";
  }
  
  if (message.includes('safe') || message.includes('safety') || message.includes('candidate was blocked')) {
    return "The AI couldn't process this content due to safety filters. Please try rephrasing your input or using more academic material.";
  }

  if (message.includes('JSON')) {
    return "The AI response was formatted incorrectly. This usually happens with complex or messy input—try cleaning up the text and re-generating.";
  }

  return "Something went wrong while processing your request. Please try rephrasing your input or check your connection.";
}
