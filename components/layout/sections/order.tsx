"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { RingLoader } from "react-spinners";
import Turnstile from "react-turnstile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const BOT_TOKEN = "7190175151:AAHaGL4M2Q71UB93NPUJ0sOAy29WSUjp1w4";
const CHAT_ID = "1365766425";
const TELEGRAM_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface FormData {
  imageFile: File | null;
  imageUrl: string;
  name: string;
  phoneNumber: string;
  idTelegram: string;
  hostname: string;
  serviceType: string;
  packageType: string;
  operatingSystem: string;
  dataCenterRegion: string;
}

const initialFormData: FormData = {
  imageFile: null,
  imageUrl: "",
  name: "",
  phoneNumber: "",
  idTelegram: "",
  hostname: "",
  serviceType: "",
  packageType: "",
  operatingSystem: "",
  dataCenterRegion: "",
};

const vpsPackageOptions = [
  "Paket Go-Lite - 25 GB NVMe 💡",
  "Paket PowerBoost - 60 GB NVMe ⚡",
  "Paket UltraX - 100 GB NVMe 🚀",
  "Paket SuperX - 180 GB NVMe 🔥",
  "Paket MegaX - 260 GB NVMe 🌠",
  "Paket GigaX - 350 GB NVMe 🚀",
];

const rdpPackageOptions = [
  "Paket Go-Lite - 25 GB NVMe 💡",
  "Paket PowerBoost - 60 GB NVMe ⚡",
  "Paket UltraX - 100 GB NVMe 🚀",
];

const vpsOperatingSystemOptions = [
  "Ubuntu 🐧",
  "CentOS 🐂",
  "Debian 🌀",
  "Fedora 🎩",
  "OpenBSD 🐡",
  "FreeBSD 🍊",
  "Alma Linux 🌎",
  "Arch Linux 🏹",
  "Alpine Linux 🗻",
];

const rdpOperatingSystemOptions = [
  "Windows Server 2022 🖥️✨",
  "Windows Server 2019 🖥️🌟",
  "Windows Server 2016 🖥️💫",
];

const dataCenterRegions = [
  "Tokyo, Jepang 🗼",
  "Singapura 🇸🇬",
  "Sydney, Australia 🇦🇺",
  "New York, USA 🗽",
  "London, UK 🇬🇧",
];

const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const OrderForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const selectedFile = target.files[0];

      if (!acceptedFileTypes.includes(selectedFile.type)) {
        Swal.fire({
          title: "Waduh mau ngapain bang?",
          text: "Hanya diizinkan image (.jpg, .jpeg, .png).",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setFormData((prevFormData) => ({ ...prevFormData, [name]: target.files![0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    // Reset dependent fields when service type changes
    if (name === "serviceType") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        packageType: "",
        operatingSystem: "",
        dataCenterRegion: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "Please complete the CAPTCHA.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsLoading(false);
      return;
    }

    try {
      const message = formatMessage(formData);
      if (formData.imageFile) {
        await sendImageToTelegram(formData.imageFile, message);
      } else if (formData.imageUrl) {
        await sendImageUrlToTelegram(formData.imageUrl, message);
      } else {
        await sendMessageToTelegram(message);
      }
      setFormData(initialFormData);
      Swal.fire({
        title: "Success!",
        text: "Your order has been placed successfully. Thank you!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (formData: FormData) => `
New Cloud VPS/RDP Order 🚀

Name: ${formData.name}
Phone Number: ${formData.phoneNumber}
Id Telegram: ${formData.idTelegram}
Hostname: ${formData.hostname}
Service Type: ${formData.serviceType}
Package Type: ${formData.packageType}
Operating System: ${formData.operatingSystem}
Data Center Region: ${formData.dataCenterRegion}
`;

  const sendMessageToTelegram = async (message: string) => {
    await fetch(`${TELEGRAM_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  };

  const sendImageToTelegram = async (imageFile: File, caption: string) => {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("caption", caption);
    formData.append("photo", imageFile);

    await fetch(`${TELEGRAM_URL}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  };

  const sendImageUrlToTelegram = async (imageUrl: string, caption: string) => {
    await fetch(`${TELEGRAM_URL}/sendPhoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: imageUrl,
        caption: caption,
        parse_mode: "Markdown",
      }),
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">Order Here</h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">Get unlimited access</h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-gray-600 pb-14">
        Fill out the form below to place your order and we will get back to you as soon as possible.
      </h3>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-950 shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-white-700 font-mono">Upload Bukti Pembayaran</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>
        {!formData.imageFile && (
          <div>
            <label className="block text-white-700 font-mono">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
        )}
        <div className="relative">
          <label className="block text-white-700 font-mono">Telegram ID</label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-0 mt-4 mr-2 text-blue-500"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-lg text-blue-500" />
          </button>
          <input
            type="text"
            name="idTelegram"
            value={formData.idTelegram}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white-700 font-mono">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white-700 font-mono">Whatsapp/Telegram Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white-700 font-mono">Hostname</label>
          <input
            type="text"
            name="hostname"
            value={formData.hostname}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white-700 font-mono">Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Service Type</option>
            <option value="VPS">VPS</option>
            <option value="RDP">RDP</option>
          </select>
        </div>
        {formData.serviceType && (
          <>
            <div>
              <label className="block text-white-700 font-mono">Package Type</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Package Type</option>
                {(formData.serviceType === "VPS" ? vpsPackageOptions : rdpPackageOptions).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white-700 font-mono">Operating System</label>
              <select
                name="operatingSystem"
                value={formData.operatingSystem}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Operating System</option>
                {(formData.serviceType === "VPS" ? vpsOperatingSystemOptions : rdpOperatingSystemOptions).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white-700 font-mono">Data Center Region</label>
              <select
                name="dataCenterRegion"
                value={formData.dataCenterRegion}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Data Center Region</option>
                {dataCenterRegions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="mt-4">
          <Turnstile
            sitekey="0x4AAAAAAAc2rK95Mjhi-ilJ"
            onVerify={(token) => setToken(token)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-mono transition-all duration-300 hover:from-purple-600 hover:to-blue-500"
          disabled={isLoading}
        >
          {isLoading ? <RingLoader size={30} color="#ffffff" /> : "Order Now!"}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-yellow-300 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
              <h3 className="text-lg font-bold leading-6 text-gray-900">Informasi Telegram ID</h3>
              <div className="mt-2">
                <p className="text-sm text-black font-mono">
                  Untuk Mengetahui Telegram ID anda, silahkan kunjungi link berikut : <a href="https://t.me/CekIDTelegram_bot">CekIDTelegram_bot</a>
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-mono transition-all duration-300 hover:from-purple-600 hover:to-blue-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
