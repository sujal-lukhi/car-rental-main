import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1 text-white">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-400 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer invert opacity-70 hover:opacity-100 transition-opacity"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-400">Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors cursor-pointer"
            >
              <option value="" className="bg-background text-gray-500">Select a category</option>
              <option value="Sedan" className="bg-background">Sedan</option>
              <option value="SUV" className="bg-background">SUV</option>
              <option value="Van" className="bg-background">Van</option>
              <option value="Extra Luxury" className="bg-background">Extra Luxury</option>
              <option value="Luxury" className="bg-background">Luxury</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors cursor-pointer"
            >
              <option value="" className="bg-background text-gray-500">Select a transmission</option>
              <option value="Automatic" className="bg-background">Automatic</option>
              <option value="Manual" className="bg-background">Manual</option>
              <option value="Semi-Automatic" className="bg-background">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors cursor-pointer"
            >
              <option value="" className="bg-background text-gray-500">Select a fuel type</option>
              <option value="Gas" className="bg-background">Gas</option>
              <option value="Diesel" className="bg-background">Diesel</option>
              <option value="Petrol" className="bg-background">Petrol</option>
              <option value="Electric" className="bg-background">Electric</option>
              <option value="Hybrid" className="bg-background">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors cursor-pointer"
          >
            <option value="" className="bg-background text-gray-500">Select a location</option>
            <option value="Ahmedabad" className="bg-background">Ahmedabad</option>
            <option value="Surat" className="bg-background">Surat</option>
            <option value="Vadodara" className="bg-background">Vadodara</option>
            <option value="Rajkot" className="bg-background">Rajkot</option>
            <option value="Gandhinagar" className="bg-background">Gandhinagar</option>
            <option value="Mumbai" className="bg-background">Mumbai</option>
            <option value="Delhi" className="bg-background">Delhi</option>
          </select>
        </div>
        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            required
            className="px-3 py-2 mt-1 border border-white/20 bg-white/5 backdrop-blur-md rounded-md outline-none text-white focus:border-white transition-colors placeholder-gray-500"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 mt-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-md font-bold w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" className="invert" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
