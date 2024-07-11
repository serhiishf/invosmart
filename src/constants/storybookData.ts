import { CSSProperties } from 'react';

export const textExamples = {
  longText:
    "A very long text value that exceeds the typical length to test the input handling and see how it manages overflow and performance. This should be long enough to trigger any potential issues with long input values. Furthermore, adding additional sentences helps to better evaluate the system's capability to process and manage extensive text input without compromising performance or causing any unexpected behavior. By doing so, we can ensure that the system remains robust and reliable, even when faced with unusually large amounts of data. This also allows us to identify any potential bottlenecks or inefficiencies in the handling of extensive text inputs. Consequently, it's essential to extend this text further to cover a wide range of scenarios and edge cases that might arise during real-world usage. Moreover, this extended text serves as a valuable test case for developers to refine and optimize their systems, ensuring seamless user experiences regardless of input size. The goal is to create a highly efficient and scalable system that can gracefully manage and process long text inputs without degradation in performance. Testing with such comprehensive and lengthy text inputs is a crucial step in achieving this objective. By thoroughly evaluating the system's response to this extended text, we gain insights into its capacity to handle large-scale inputs, thereby reinforcing its reliability and robustness in diverse use cases. This approach ensures that all potential issues are addressed, paving the way for a more resilient and effective system that meets users needs and expectations in various demanding scenarios.",
};

export const styleData: { [key: string]: CSSProperties } = {
  flexColumn: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  flexRow: { display: 'flex', flexDirection: 'row', gap: '2rem' },
};
