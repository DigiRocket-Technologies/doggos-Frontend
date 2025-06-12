import { useState } from "react";
import { useForm } from "react-hook-form";
import { addPet } from "../store/slices/petSlice";
import { useDispatch, useSelector } from "react-redux";

const PetForm = () => {
  const { addPetLoading } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth); 
  const { register, handleSubmit, reset } = useForm();
  const [pets, setPets] = useState([{ vaccinations: [] }]);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {

    const formData = {
      ...data,
      ownerName: user?.fullName,
      phone: user?.phone,
      email: user?.email,
      address: user?.address,
      segment: data.segment 
    };

    dispatch(addPet(formData))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Data saved successfully");
          reset();
          setPets([{}]);
        } else alert("Error saving data");
      })
      .catch((err) => {
        alert("Error saving data");
      });
  };

    
    console.log(user);

  const speciesBreeds = {
    dog: [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Shih Tzu",
      "Siberian Husky",
      "Poodle (Toy, Miniature, Standard)",
      "Maltipoo",
      "Pug",
      "Beagle",
      "Rottweiler",
      "Doberman Pinscher",
      "Boxer",
      "Great Dane",
      "Saint Bernard",
      "Cocker Spaniel",
      "Lhasa Apso",
      "Dachshund",
      "Chihuahua (Teacup & Standard)",
      "Pitbull Terrier",
      "Akita Inu",
      "Dalmatian",
      "French Bulldog",
      "English Bulldog",
      "Border Collie",
      "Bullmastiff",
      "Alaskan Malamute",
      "Cane Corso",
      "Belgian Malinois",
      "Pomeranian (including Toy Pomeranian)",
      "Yorkshire Terrier",
      "American Eskimo Dog",
      "Boston Terrier",
      "Afghan Hound",
      "Cavalier King Charles Spaniel",
      "Maltese",
      "Samoyed",
      "Newfoundland",
      "West Highland White Terrier (Westie)",
      "Miniature Schnauzer",
      "Bernese Mountain Dog",
      "Irish Setter",
      "Basset Hound",
      "Scottish Terrier",
      "Havanese",
      "Weimaraner",
      "Jack Russell Terrier",
      "Bloodhound",
      "Whippet",
      "Shetland Sheepdog",
      "Shiba Inu",
      "Indian Spitz",
      "Rajapalayan",
      "Gaddi Kutta",
      "Indie",
    ]
    
  };

  const handleAddPet = () => {
    setPets([...pets, { vaccinations: [] }]);
  };

  const handleAddVaccination = (petIndex) => {
    const newPets = [...pets];
    newPets[petIndex].vaccinations = [
      ...(newPets[petIndex].vaccinations || []),
      { name: "", numberOfDose: "" },
    ];
    setPets(newPets);
  };

  const handleRemoveVaccination = (petIndex, vaccinationIndex) => {
    const newPets = [...pets];
    newPets[petIndex].vaccinations.splice(vaccinationIndex, 1);
    setPets(newPets);
  };

  if (addPetLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  } else
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Display logged-in user info (read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Name: </span>
                <span className="text-sm text-gray-800">
                  {user?.fullName}
                </span>
              </div>
             
              <div>
                <span className="text-sm font-medium text-gray-600">Email: </span>
                <span className="text-sm text-gray-800">{user?.email || "N/A"}</span>
              </div>
              
            </div>
          </div>

          {/* Segment selection - keep this as user input */}
          <div>
            <label
              htmlFor="segment"
              className="block text-sm font-medium text-gray-700"
            >
              Segment
            </label>
            <select
              id="segment"
              {...register("segment", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Day Care">Day Care</option>
              <option value="Veterinary">Veterinary</option>
            </select>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Pet Information
          </h2>

          {pets?.map((pet, petIndex) => (
            <div key={petIndex}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor={`name_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`name_${petIndex}`}
                    {...register(`pets[${petIndex}].name`, { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`species_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Species
                  </label>
                  <select
                    id={`species_${petIndex}`}
                    {...register(`pets[${petIndex}].species`, {
                      required: true,
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Select a species</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="reptile">Reptile</option>
                    <option value="hamster">Hamster</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`breed_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Breed
                  </label>
                  <select
                    id={`breed_${petIndex}`}
                    {...register(`pets[${petIndex}].breed`, { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Select a breed</option>
                    {/* Grouping species and their breeds */}
                    {Object.keys(speciesBreeds)?.map((species) => (
                      <optgroup
                        label={
                          species.charAt(0).toUpperCase() + species.slice(1)
                        }
                        key={species}
                      >
                        {speciesBreeds[species].map((breed) => (
                          <option key={breed} value={breed}>
                            {breed}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`sex_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sex
                  </label>
                  <select
                    id={`sex_${petIndex}`}
                    {...register(`pets[${petIndex}].sex`, { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`color_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id={`color_${petIndex}`}
                    {...register(`pets[${petIndex}].color`, { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`dob_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id={`dob_${petIndex}`}
                    {...register(`pets[${petIndex}].dob`, { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex">
                  <label
                    htmlFor={`neutered_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Neutered
                  </label>
                  <input
                    type="checkbox"
                    id={`neutered_${petIndex}`}
                    {...register(`pets[${petIndex}].neutered`)}
                    className="mt-1 ml-4 block w-4 h-4 rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`registrationDate_${petIndex}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Registration date
                  </label>
                  <input
                    type="date"
                    id={`registrationDate_${petIndex}`}
                    {...register(`pets[${petIndex}].registrationDate`, {
                      required: true,
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {pet.vaccinations &&
                  pet.vaccinations.map((vaccination, vaccinationIndex) => (
                    <div
                      key={vaccinationIndex}
                      className="flex items-center gap-4 mb-2"
                    >
                      <input
                        type="text"
                        {...register(
                          `pets[${petIndex}].vaccinations[${vaccinationIndex}].name`
                        )}
                        className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Vaccination Name"
                      />
                      <input
                        type="number"
                        {...register(
                          `pets[${petIndex}].vaccinations[${vaccinationIndex}].numberOfDose`
                        )}
                        className="w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Doses"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveVaccination(petIndex, vaccinationIndex)
                        }
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => handleAddVaccination(petIndex)}
                    className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Vaccination
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddPet}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another Pet
          </button>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
};

export default PetForm;