import type { ReviewDocument } from '@/types';

/** Canned, evidence-citing answers keyed loosely off the suggested prompts —
 * there's no real LLM in this prototype, but every answer grounds itself in
 * an actual extracted field rather than inventing information. */
export function craftAssistantAnswer(
  question: string,
  doc: ReviewDocument
): { content: string; evidence?: string } {
  const q = question.toLowerCase();
  const lowest = [...doc.fields].sort((a, b) => a.confidence - b.confidence)[0];
  const totalField = doc.fields.find((f) => /total|amount/i.test(f.label));
  const statusField = doc.fields.find((f) => /status/i.test(f.label));

  if (q.includes('summar')) {
    return {
      content: `This ${doc.type.toLowerCase()} has ${doc.fields.length} extracted fields at ${doc.confidence}% average confidence.${
        totalField ? ` ${totalField.label}: ${totalField.value}.` : ''
      }`,
      evidence: totalField?.label,
    };
  }

  if (q.includes('anomal')) {
    return lowest && lowest.confidence < 80
      ? {
          content: `${lowest.label} has the lowest confidence at ${lowest.confidence}% — worth double-checking against the source document.`,
          evidence: lowest.label,
        }
      : { content: 'No anomalies detected — every field is above 80% confidence.' };
  }

  if (q.includes('compar')) {
    return {
      content: `I don't have prior documents from this vendor loaded in this prototype, but ${
        totalField ? `the ${totalField.label.toLowerCase()} here is ${totalField.value}.` : 'this document looks consistently formatted.'
      }`,
      evidence: totalField?.label,
    };
  }

  if (q.includes('payment') || q.includes('status')) {
    return statusField
      ? {
          content: `${statusField.label} is currently "${statusField.value}" (${statusField.confidence}% confidence).`,
          evidence: statusField.label,
        }
      : { content: `This ${doc.type.toLowerCase()} doesn't have a payment-status field.` };
  }

  return {
    content: `Based on the extracted fields, ${
      lowest ? `${lowest.label} ("${lowest.value}") is the one I'm least confident about at ${lowest.confidence}%.` : 'everything looks consistent.'
    } Let me know if you'd like me to look at something specific.`,
    evidence: lowest?.label,
  };
}
