import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqData = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "How long does it take to deliver a parcel?",
      answer:
        "We offer same-day delivery within Dhaka city and 24-48 hours delivery for districts across Bangladesh. Delivery times may vary slightly based on the specific location and pickup time.",
    },
    {
      question: "How can I track my parcel in real-time?",
      answer:
        "Once your parcel is picked up, you will receive a tracking ID via SMS. Simply enter this ID into our 'Live Tracking' section on the homepage to see the exact location of your parcel.",
    },
    {
      question: "Is there any insurance for fragile products?",
      answer:
        "Yes! zapShift provides 100% safety assurance. For high-value or fragile items, we offer specialized handling and insurance coverage up to the declared value of the product.",
    },
    {
      question: "How do merchants receive their payments?",
      answer:
        "We offer automated daily payments for our merchants via Bank Transfer, bKash, or Nagad. Once the parcel is delivered, the payment is processed within 24 hours.",
    },
  ];
  return (
    <div className="mt-12 mb-24">
      <div className="max-w-208 mx-auto text-center space-y-6 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-accent"
        >
          Frequently Asked <span className="text-primary">Questions</span>
        </motion.h2>
        <p className="text-granite-gray">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="collapse collapse-arrow bg-white border border-gray-100 transition-all duration-300 has-checked:bg-cloud-white has-checked:shadow-lg has-checked:border-primary/30"
          >
            <input type="radio" name="faq-accordion" />

            <div className="collapse-title font-bold text-accent py-5 px-8">
              {faq.question}
            </div>

            <div className="collapse-content px-8 pb-5 text-granite-gray leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
