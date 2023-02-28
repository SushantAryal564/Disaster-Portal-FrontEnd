import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function ManageData({ polygonCoords }) {
  const buildingdata = useSelector((state) => {
    return state.buildings.selectedBuilding;
  });
  async function postPolygonData(data) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/analysis/allbuilding/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ way: polygonCoords, ...data }),
        }
      );
    } catch (error) {}
  }
  if (buildingdata) {
    var {
      osm_id,
      phoneNumber1,
      phoneNumber2,
      people,
      housemetricnumber,
      type,
      email,
    } = buildingdata;
  }

  const formik = useFormik({
    initialValues: {
      osm_id: osm_id || "",
      phoneNumber1: phoneNumber1 || "",
      phoneNumber2: phoneNumber2 || "",
      housemetricnumber: housemetricnumber || "",
      buildingtype: type || "",
      people: people || "",
      email: email || "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      type: Yup.string(),
      phoneNumber1: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits"),
      phoneNumber2: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits"),
      people: Yup.number().integer("Enter valid number"),
      housemetricnumber: Yup.string().matches(
        /^\d+/,
        "Enter valid house metric Number"
      ),
      address: Yup.string().min(5, "Enter valid address"),
      buildingtype: Yup.string().min(5, "Enter valid address"),
      email: Yup.string().email("Invalid email address"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // postPolygonData(values)
    },
  });

  let formIsValid = true;
  useEffect(() => {
    formik.setValues({
      osm_id: osm_id || "",
      phoneNumber1: phoneNumber1 || "",
      phoneNumber2: phoneNumber2 || "",
      people: people || "",
      houseMetricNumber: housemetricnumber || "",
      type: type || "",
    });
  }, [buildingdata]);

  if (
    (formik.errors.name || formik.touched.name) &&
    (formik.errors.type || formik.touched.type) &&
    (formik.errors.phoneNumber1 || formik.touched.phoneNumber1) &&
    (formik.errors.phoneNumber2 || formik.touched.phoneNumber2) &&
    (formik.errors.people || formik.touched.people) &&
    (formik.errors.housemetricnumber || formik.touched.housemetricnumber) &&
    (formik.errors.address || formik.touched.address) &&
    (formik.errors.buildingtype || formik.touched.buildingtype) &&
    (formik.errors.email || formik.touched.email)
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }
  return (
    <div className="h-full self-center text-gray-500 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-4">
          <div className="flex flex-row items-center justify-center lg:justify-start ">
            <p className=" mx-1 mt-2 font-bold text-lg">Manage Building Data</p>
          </div>
          <div>
            <div className="grid-cols-2">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="housemetricnumber"
                  name="housemetricnumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.housemetricnumber}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  House Metric Number
                </label>
              </div>
              {formik.errors.osm_id && formik.touched.osm_id ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.osm_id}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-5">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50"
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              <label class="after:content[' '] pointer-events-none absolute left-0 -top-3 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                ADDRESS
              </label>
            </div>
            {formik.errors.address && formik.touched.address ? (
              <div className="text-red-600 text-xs pt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="grid-cols-2">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="buildingtype"
                  name="buildingtype"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.buildingtype}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  Building Type
                </label>
              </div>
              {formik.errors.buildingtype && formik.touched.buildingtype ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.buildingtype}
                </div>
              ) : null}
            </div>
            <div className="grid-cols-2 ">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="people"
                  name="people"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.people}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  Number of People
                </label>
              </div>
              {formik.errors.people && formik.touched.people ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.people}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="grid-cols-2">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="phoneNumber1"
                  name="phoneNumber1"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber1}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  Phone Number 1
                </label>
              </div>
              {formik.errors.phoneNumber1 && formik.touched.phoneNumber1 ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.phoneNumber1}
                </div>
              ) : null}
            </div>
            <div className="grid-cols-2 ">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="phoneNumber2"
                  name="phoneNumber2"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber2}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  Phone Number 2
                </label>
              </div>
              {formik.errors.phoneNumber2 && formik.touched.phoneNumber2 ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.phoneNumber2}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-5">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50"
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label class="after:content[' '] pointer-events-none absolute left-0 -top-3 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                Email Address
              </label>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 text-xs pt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div class="flex justify-center space-x-2">
            <button
              type="submit"
              disabled={!formIsValid}
              class="inline-block rounded bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManageData;
