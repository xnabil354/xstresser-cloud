"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { RingLoader } from "react-spinners";
import Turnstile from "react-turnstile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const BOT_TOKEN = "7127464176:AAG5ZZs4dlEZHxIRGjzQMPtuUsYgTroG0Fs";
const CHAT_ID = "1600255418";
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
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode

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
      if (name === "phoneNumber" || name === "idTelegram") {
        if (!/^\d*$/.test(value)) {
          return;
        }
      }
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
    <div id="orderhere" className="container mx-auto p-6">
      <h2 className="text-lg text-primary mt-2 text-center mb-2 tracking-wider">Order Now!</h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">Buat kamu yang gamau ribet, Order langsung dibawah sini!</h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-gray-600 pb-14">
        Fill out the form below to place your order and we will get back to you as soon as possible.
      </h3>
      <form
        onSubmit={handleSubmit}
        className={`max-w-xl mx-auto shadow-md rounded-lg p-6 space-y-4 ${isDarkMode ? 'bg-gray-950' : 'bg-transparent'}`}
      >
        <div>
          <label className="block text-primary mt-2 font-mono">Upload Bukti Pembayaran</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
          />
          <span className="text-sm text-gray-500">Accepted formats: .jpg, .jpeg, .png</span>
        </div>
        {!formData.imageFile && (
          <div>
            <label className="block text-primary mt-2 font-mono">Image URL (Optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            />
          </div>
        )}
        <div>
          <label className="block text-primary mt-2 font-mono">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan Nama Anda"
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            required
          />
        </div>
        <div>
          <label className="block text-primary mt-2 font-mono">Nomor WhatsApp/Telegram</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="\d*"
            placeholder="Masukkan Nomor WhatsApp/Telegram"
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            required
          />
        </div>
        <div>
          <label className="block text-primary mt-2 font-mono">Id Telegram</label>
          <input
            type="text"
            name="idTelegram"
            value={formData.idTelegram}
            onChange={handleChange}
            pattern="\d*"
            placeholder="Masukkan ID Telegram"
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            required
          />
        </div>
        <div>
          <label className="block text-primary mt-2 font-mono">Hostname</label>
          <input
            type="text"
            name="hostname"
            value={formData.hostname}
            onChange={handleChange}
            placeholder="Masukkan Hostname"
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            required
          />
        </div>
        <div>
          <label className="block text-primary mt-2 font-mono">Tipe Layanan</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
            required
          >
            <option value="" disabled>
              Pilih tipe layanan
            </option>
            <option value="VPS">VPS</option>
            <option value="RDP">RDP</option>
          </select>
        </div>
        {formData.serviceType && (
          <div>
            <label className="block text-primary mt-2 font-mono">Pilih Paket</label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
              required
            >
              <option value="" disabled>
                Pilih paket
              </option>
              {(formData.serviceType === "VPS" ? vpsPackageOptions : rdpPackageOptions).map((packageOption) => (
                <option key={packageOption} value={packageOption}>
                  {packageOption}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.serviceType && (
          <div>
            <label className="block text-primary mt-2 font-mono">Sistem Operasi</label>
            <select
              name="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleChange}
              className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
              required
            >
              <option value="" disabled>
                Pilih sistem operasi
              </option>
              {(formData.serviceType === "VPS" ? vpsOperatingSystemOptions : rdpOperatingSystemOptions).map((osOption) => (
                <option key={osOption} value={osOption}>
                  {osOption}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.serviceType && (
          <div>
            <label className="block text-primary mt-2 font-mono">Wilayah Data Center</label>
            <select
              name="dataCenterRegion"
              value={formData.dataCenterRegion}
              onChange={handleChange}
              className={`mt-1 p-3 w-full border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-transparent text-cyan-600'} rounded-lg`}
              required
            >
              <option value="" disabled>
                Pilih wilayah data center
              </option>
              {dataCenterRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <Turnstile sitekey="0x4AAAAAAAc5YaxYr1eWRxBn" onVerify={(token) => setToken(token)} />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-center py-3 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? <RingLoader size={24} color={"#ffffff"} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
