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
    "Tick fever": "Sốt ve",
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
    { value: "Fever", label: "Sốt" },
    { value: "Nasal Discharge", label: "Chảy dịch mũi" },
    { value: "Loss of appetite", label: "Mất cảm giác thèm ăn" },
    { value: "Weight Loss", label: "Sụt cân" },
    { value: "Lameness", label: "Khập khiễng" },
    { value: "Breathing Difficulty", label: "Khó thở" },
    { value: "Swollen Lymph nodes", label: "Sưng hạch bạch huyết" },
    { value: "lethargy", label: "Mệt mỏi" },
    { value: "Depression", label: "Chán nản" },
    { value: "Coughing", label: "Ho" },
    { value: "Diarrhea", label: "Tiêu chảy" },
    { value: "Seizures", label: "Co giật" },
    { value: "Vomiting", label: "Nôn mửa" },
    { value: "Eating less than usual", label: "Ăn ít hơn bình thường" },
    { value: "Excessive Salivation", label: "Chảy nước dãi nhiều" },
    { value: "Redness around Eye area", label: "Đỏ xung quanh vùng mắt" },
    { value: "Severe Dehydration", label: "Mất nước nghiêm trọng" },
    { value: "Pain", label: "Đau" },
    { value: "Discomfort", label: "Khó chịu" },
    { value: "Sepsis", label: "Nhiễm trùng huyết" },
    { value: "Tender abdomen", label: "Đau bụng" },
    { value: "Increased drinking and urination", label: "Uống và tiểu tiện nhiều hơn" },
    { value: "Bloated Stomach", label: "Bụng phình to" },
    { value: "Yellow gums", label: "Lợi vàng" },
    { value: "Constipation", label: "Táo bón" },
    { value: "Paralysis", label: "Liệt" },
    { value: "Wrinkled forehead", label: "Trán nhăn" },
    { value: "Continuously erect and stiff ears", label: "Tai dựng liên tục và cứng đơ" },
    { value: "Grinning appearance", label: "Biểu cảm cười gượng" },
    { value: "Stiff and hard tail", label: "Đuôi cứng và cứng đơ" },
    { value: "Stiffness of muscles", label: "Cứng cơ" },
    { value: "Acute blindness", label: "Mù đột ngột" },
    { value: "Blood in urine", label: "Có máu trong nước tiểu" },
    { value: "Hunger", label: "Đói" },
    { value: "Cataracts", label: "Đục thủy tinh thể" },
    { value: "Losing sight", label: "Mất thị lực" },
    { value: "Glucose in urine", label: "Glucose trong nước tiểu" },
    { value: "Burping", label: "Ợ hơi" },
    { value: "blood in stools", label: "Có máu trong phân" },
    { value: "Passing gases", label: "Xì hơi" },
    { value: "Eating grass", label: "Ăn cỏ" },
    { value: "Scratching", label: "Gãi" },
    { value: "Licking", label: "Liếm" },
    { value: "Itchy skin", label: "Ngứa da" },
    { value: "Redness of skin", label: "Đỏ da" },
    { value: "Face rubbing", label: "Cọ xát mặt" },
    { value: "Loss of Fur", label: "Rụng lông" },
    { value: "Swelling of gum", label: "Sưng lợi" },
    { value: "Redness of gum", label: "Đỏ lợi" },
    { value: "Receding gum", label: "Lợi tụt" },
    { value: "Bleeding of gum", label: "Chảy máu lợi" },
    { value: "Plaque", label: "Mảng bám" },
    { value: "Bad breath", label: "Hơi thở hôi" },
    { value: "Tartar", label: "Cao răng" },
    { value: "Lumps", label: "Cục u" },
    { value: "Swelling", label: "Sưng tấy" },
    { value: "Red bumps", label: "Nốt đỏ" },
    { value: "Scabs", label: "Vảy da" },
    { value: "Irritation", label: "Kích ứng" },
    { value: "Dry Skin", label: "Da khô" },
    { value: "Fur loss", label: "Rụng lông" },
    { value: "Red patches", label: "Vùng đỏ trên da" },
    { value: "Heart Complication", label: "Biến chứng tim" },
    { value: "Weakness", label: "Yếu đuối" },
    { value: "Aggression", label: "Hung dữ" },
    { value: "Pale gums", label: "Lợi nhợt nhạt" },
    { value: "Coma", label: "Hôn mê" },
    { value: "Collapse", label: "Ngã gục" },
    { value: "Abdominal pain", label: "Đau bụng" },
    { value: "Difficulty Urinating", label: "Khó đi tiểu" },
    { value: "Dandruff", label: "Gàu" },
    { value: "Anorexia", label: "Chán ăn" },
    { value: "Blindness", label: "Mù lòa" },
    { value: "excess jaw tone", label: "Căng hàm quá mức" },
    { value: "Urine infection", label: "Nhiễm trùng đường tiểu" },
    { value: "Lack of energy", label: "Thiếu năng lượng" },
    { value: "Smelly", label: "Có mùi khó chịu" },
    { value: "Neurological Disorders", label: "Rối loạn thần kinh" },
    { value: "Eye Discharge", label: "Chảy dịch mắt" },
    { value: "Loss of Consciousness", label: "Mất ý thức" },
    { value: "Enlarged Liver", label: "Gan to" },
    { value: "Purging", label: "Tẩy ruột" },
    { value: "Bloody discharge", label: "Dịch tiết có máu" },
    { value: "Wounds", label: "Vết thương" }
  ];


  const handleSymptomChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSymptoms(selectedValues);
  };
  const getLabelByValue = (value: String) => {
    const symptom = symptomOptions.find(symptom => symptom.value === value);
    return symptom ? symptom.label : null; // Returns the label or null if not found
  }
  const possibleDiseases = [
    "Tick fever",
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
    <div className="flex flex-col items-center justify-center my-4 md:my-6 lg:my-8">
      <div className="w-5/6 bg-white p-4 md:p-6 lg:p-8 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-5/6 bg-white p-4 shadow-lg rounded-lg">
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
                        {getLabelByValue(symptom)}
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