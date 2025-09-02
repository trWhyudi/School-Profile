import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa'
import { Collapse } from "react-collapse";

const faqData = [
  {
    question: "Bagaimana cara mendaftar?",
    answer: "Pendaftaran bisa dilakukan secara online melalui website ini atau langsung datang ke sekolah."
  },
  {
    question: "Kapan pendaftaran dibuka?",
    answer: "Pendaftaran biasanya dibuka pada bulan Juni. Informasi terbaru ada di halaman PPDB."
  },
  {
    question: "Apakah sekolah menerima siswa pindahan?",
    answer: "Ya, kami menerima siswa pindahan sesuai ketersediaan kelas."
  },
  {
    question: "Apa saja fasilitas sekolah?",
    answer: "Fasilitas kami meliputi ruang kelas nyaman, perpustakaan, laboratorium, dan lapangan olahraga."
  },
  {
    question: "Apakah ada program beasiswa?",
    answer: "Ya, tersedia beasiswa untuk siswa berprestasi dan kurang mampu."
  },
]

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <section className="bg-sky-50 to-white pt-20 pb-40 px-6">
      <div className="max-w-4xl mx-auto" data-aos="fade-in">
        <div className="text-center mb-12">
          <FaQuestionCircle className="text-5xl text-sky-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg font-sans">
            Punya pertanyaan? Berikut beberapa yang sering ditanyakan oleh orang
            tua dan calon siswa.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center text-left p-5 hover:bg-sky-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-800 font-medium text-md md:text-lg">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-sky-600" />
                ) : (
                  <FaChevronDown className="text-sky-600" />
                )}
              </button>

              <Collapse isOpened={activeIndex === index}>
                <div className="px-5 pb-4">
                  <p className="text-gray-600 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq
