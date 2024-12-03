"use client";
import React, { useState } from "react";
import axios from "axios";
import Select from 'react-select';


const translatePrediction = (prediction: string) => {
  const translations: { [key: string]: string } = {
    flea_allergy: "Dị ứng bọ chét",
    hotspot: "Viêm da cơ địa",
    mange: "Ghẻ lỡ",
    ringworm: "Nấm ngoài da",
    "Tick Fever": "Sốt ve",
    Distemper: "Bệnh sài sốt",
    Parvovirus: "Bệnh Parvovirus",
    Hepatitis: "Viêm gan",
    Tetanus: "Uốn ván",
    "Chronic kidney Disease": "Bệnh thận mãn tính",
    Diabetes: "Tiểu đường",
    "Gastrointestinal Disease": "Bệnh đường tiêu hóa",
    Allergies: "Dị ứng",
    Gingitivis: "Viêm nướu",
    Cancers: "Ung thư",
    "Skin Rashes": "Phát ban da",
    // Add more translations as needed
  };
  return translations[prediction] || prediction;
};

const PredictPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictionByImage, setPredictionByImage] = useState<string | null>(null);
  const [predictionBySymptoms, setPredictionBySymptoms] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const symptomOptions = [
    { value: "Sốt", label: "Sốt" },
    { value: "Chảy dịch mũi", label: "Chảy dịch mũi" },
    { value: "Mất cảm giác thèm ăn", label: "Mất cảm giác thèm ăn" },
    { value: "Sụt cân", label: "Sụt cân" },
    { value: "Khập khiễng", label: "Khập khiễng" },
    { value: "Khó thở", label: "Khó thở" },
    { value: "Sưng hạch bạch huyết", label: "Sưng hạch bạch huyết" },
    { value: "Mệt mỏi", label: "Mệt mỏi" },
    { value: "Chán nản", label: "Chán nản" },
    { value: "Ho", label: "Ho" },
    { value: "Tiêu chảy", label: "Tiêu chảy" },
    { value: "Co giật", label: "Co giật" },
    { value: "Nôn mửa", label: "Nôn mửa" },
    { value: "Ăn ít hơn bình thường", label: "Ăn ít hơn bình thường" },
    { value: "Chảy nước dãi nhiều", label: "Chảy nước dãi nhiều" },
    { value: "Đỏ xung quanh vùng mắt", label: "Đỏ xung quanh vùng mắt" },
    { value: "Mất nước nghiêm trọng", label: "Mất nước nghiêm trọng" },
    { value: "Đau", label: "Đau" },
    { value: "Khó chịu", label: "Khó chịu" },
    { value: "Nhiễm trùng huyết", label: "Nhiễm trùng huyết" },
    { value: "Đau bụng", label: "Đau bụng" },
    { value: "Uống và tiểu tiện nhiều hơn", label: "Uống và tiểu tiện nhiều hơn" },
    { value: "Bụng phình to", label: "Bụng phình to" },
    { value: "Lợi vàng", label: "Lợi vàng" },
    { value: "Táo bón", label: "Táo bón" },
    { value: "Liệt", label: "Liệt" },
    { value: "Trán nhăn", label: "Trán nhăn" },
    { value: "Tai dựng liên tục và cứng đơ", label: "Tai dựng liên tục và cứng đơ" },
    { value: "Biểu cảm cười gượng", label: "Biểu cảm cười gượng" },
    { value: "Đuôi cứng và cứng đơ", label: "Đuôi cứng và cứng đơ" },
    { value: "Cứng cơ", label: "Cứng cơ" },
    { value: "Mù đột ngột", label: "Mù đột ngột" },
    { value: "Có máu trong nước tiểu", label: "Có máu trong nước tiểu" },
    { value: "Đói", label: "Đói" },
    { value: "Đục thủy tinh thể", label: "Đục thủy tinh thể" },
    { value: "Mất thị lực", label: "Mất thị lực" },
    { value: "Glucose trong nước tiểu", label: "Glucose trong nước tiểu" },
    { value: "Ợ hơi", label: "Ợ hơi" },
    { value: "Có máu trong phân", label: "Có máu trong phân" },
    { value: "Xì hơi", label: "Xì hơi" },
    { value: "Ăn cỏ", label: "Ăn cỏ" },
    { value: "Gãi", label: "Gãi" },
    { value: "Liếm", label: "Liếm" },
    { value: "Ngứa da", label: "Ngứa da" },
    { value: "Đỏ da", label: "Đỏ da" },
    { value: "Cọ xát mặt", label: "Cọ xát mặt" },
    { value: "Rụng lông", label: "Rụng lông" },
    { value: "Sưng lợi", label: "Sưng lợi" },
    { value: "Đỏ lợi", label: "Đỏ lợi" },
    { value: "Lợi tụt", label: "Lợi tụt" },
    { value: "Chảy máu lợi", label: "Chảy máu lợi" },
    { value: "Mảng bám", label: "Mảng bám" },
    { value: "Hơi thở hôi", label: "Hơi thở hôi" },
    { value: "Cao răng", label: "Cao răng" },
    { value: "Cục u", label: "Cục u" },
    { value: "Sưng tấy", label: "Sưng tấy" },
    { value: "Nốt đỏ", label: "Nốt đỏ" },
    { value: "Vảy da", label: "Vảy da" },
    { value: "Kích ứng", label: "Kích ứng" },
    { value: "Da khô", label: "Da khô" },
    { value: "Vùng đỏ trên da", label: "Vùng đỏ trên da" },
    { value: "Biến chứng tim", label: "Biến chứng tim" },
    { value: "Yếu đuối", label: "Yếu đuối" },
    { value: "Hung dữ", label: "Hung dữ" },
    { value: "Lợi nhợt nhạt", label: "Lợi nhợt nhạt" },
    { value: "Hôn mê", label: "Hôn mê" },
    { value: "Ngã gục", label: "Ngã gục" },
    { value: "Khó đi tiểu", label: "Khó đi tiểu" },
    { value: "Gàu", label: "Gàu" },
    { value: "Chán ăn", label: "Chán ăn" },
    { value: "Mù lòa", label: "Mù lòa" },
    { value: "Căng hàm quá mức", label: "Căng hàm quá mức" },
    { value: "Nhiễm trùng đường tiểu", label: "Nhiễm trùng đường tiểu" },
    { value: "Thiếu năng lượng", label: "Thiếu năng lượng" },
    { value: "Có mùi khó chịu", label: "Có mùi khó chịu" },
    { value: "Rối loạn thần kinh", label: "Rối loạn thần kinh" },
    { value: "Chảy dịch mắt", label: "Chảy dịch mắt" },
    { value: "Mất ý thức", label: "Mất ý thức" },
    { value: "Gan to", label: "Gan to" },
    { value: "Tẩy ruột", label: "Tẩy ruột" },
    { value: "Dịch tiết có máu", label: "Dịch tiết có máu" },
    { value: "Vết thương", label: "Vết thương" },
  ];


  const handleSymptomChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSymptoms(selectedValues);
  };
  const possibleDiseases = [
    "Tick Fever",
    "Distemper",
    "Parvovirus",
    "Hepatitis",
    "Tetanus",
    "Chronic kidney Disease",
    "Diabetes",
    "Gastrointestinal Disease",
    "Allergies",
    "Gingitivis",
    "Cancers",
    "Skin Rashes",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
        setSelectedImage(URL.createObjectURL(file));
      };
    }
  };


  const handleConfirmSymptoms = () => {
    setSelectedSymptoms(symptoms); // Replace the previous logic to synchronize with current selection
  };
  const PredictImage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict/image", {
        image,
      });
      setPredictionByImage(
        `Dự đoán từ hình ảnh: ${translatePrediction(response.data.prediction)}`
      );
    } catch (error) {
      console.error("Image Prediction error:", error);
      setPredictionByImage("Có lỗi xảy ra trong dự đoán từ hình ảnh.");
    }
  };

  const PredictSymptoms = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict/data", {
        symptoms: selectedSymptoms,
      });
      const predictions = response.data.predictions;

      if (typeof predictions === "object" && !Array.isArray(predictions)) {
        const predictionArray = possibleDiseases.map((disease) => ({
          disease,
          probability: predictions[disease] || 0,
        }));

        const sortedByProbability = predictionArray.sort(
          (a, b) => b.probability - a.probability
        );

        const topThree = sortedByProbability.slice(0, 3);
        const formattedPredictions = topThree.map(
          (pred) =>
            `${translatePrediction(pred.disease)} (${(pred.probability * 100).toFixed(
              1
            )}%)`
        );

        setPredictionBySymptoms(`Dự đoán từ triệu chứng: ${formattedPredictions.join(", ")}`);
      } else {
        setPredictionBySymptoms("Dự đoán không hợp lệ.");
      }
    } catch (error) {
      console.error("Symptoms Prediction error:", error);
      setPredictionBySymptoms("Có lỗi xảy ra trong dự đoán từ triệu chứng.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 md:my-12 lg:my-16">
      <div className="w-5/6 bg-white p-8 md:p-10 lg:p-12 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-5/6 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-4">
              Dự đoán bệnh cho chó cưng
            </h1>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="image">
                  Tải lên hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />

                {/* Image Preview */}
                {selectedImage && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700">Xem trước hình ảnh:</p>
                    <img
                      src={selectedImage}
                      alt="Xem trước hình ảnh đã tải lên"
                      className="w-full max-w-xs rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={PredictImage}
                  className=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4"
                >
                  Dự đoán từ hình ảnh
                </button>
              </div>
              {/* Prediction Results */}
              {predictionByImage && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                  <h2 className="text-xl font-bold">Kết quả từ hình ảnh:</h2>
                  <p>{predictionByImage}</p>
                </div>
              )}

              {/* Symptoms Selection */}
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="symptoms">
                  Chọn triệu chứng (tối thiểu 3)
                </label>
                <Select
                  id="symptoms"
                  options={symptomOptions}
                  isMulti
                  onChange={handleSymptomChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Chọn triệu chứng..."
                />
                <button
                  type="button"
                  onClick={handleConfirmSymptoms}
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Xác nhận triệu chứng
                </button>
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                  <h3 className="font-bold mb-2">Các triệu chứng đã chọn:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center">
                <button
                  onClick={PredictSymptoms}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Dự đoán từ triệu chứng
                </button>
              </div>
            </div>

            {predictionBySymptoms && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                <h2 className="text-xl font-bold">Kết quả từ triệu chứng:</h2>
                <p>{predictionBySymptoms}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictPage;