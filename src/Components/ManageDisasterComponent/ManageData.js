import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

function ManageData() {
  const buildingdata = useSelector((state) => {
    return state.buildings.selectedBuilding;
  });
  if (buildingdata) {
    var {
      osm_id,
      phoneNumber1,
      phoneNumber2,
      people,
      housemetricnumber,
      type,
    } = buildingdata;
  }
  const formik = useFormik({
    initialValues: {
      osm_id: "",
      name: "",
      type: "",
      phoneNumber1: "",
      phoneNumber2: "",
      address: "",
      housemetricnumber: "",
      buildingtype: "",
      people: "",
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
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="h-96 self-center text-gray-500 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-4">
          <div className="flex flex-row items-center justify-center lg:justify-start ">
            <p className=" mx-1 mt-2 font-bold text-lg">Manage Building Data</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid-cols-2">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="osm_id"
                  name="osm_id"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={osm_id || formik.values.osm_id}
                />
                <label class="after:content[' '] pointer-events-none absolute left-0 top-1 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                  OSM ID
                </label>
              </div>
              {formik.errors.osm_id && formik.touched.osm_id ? (
                <div className="text-red-600 text-xs pt-1">
                  {formik.errors.osm_id}
                </div>
              ) : null}
            </div>
            <div className="grid-cols-2">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer border-b w-full border-blue-gray-200 bg-transparent pt-4 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  id="housemetricnumber"
                  name="housemetricnumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={housemetricnumber || formik.values.housemetricnumber}
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
                  value={type || formik.values.buildingtype}
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
                  value={people || formik.values.people}
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
                  value={phoneNumber1 || formik.values.phoneNumber1}
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
                  value={phoneNumber2 || formik.values.phoneNumber2}
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
        </div>
      </form>
    </div>
  );
}

export default ManageData;
