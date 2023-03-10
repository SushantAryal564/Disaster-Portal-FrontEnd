import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {amenitiesToggle, setbuldingToggle ,setamenitiesToggle} from '../store/Slices/riskinfoSlice'

export const CriticalInfrastructure = () => {
  const criticalInfraBuildingToggle=useSelector(state=>state.riskinfo.crticalInfraBuindingToggle)
  const amenitiesToggle=useSelector(state=>state.riskinfo.amenitiesToggle)
  const dispatch=useDispatch()

  return (
    <div>    
      <div  class="flex items-center">
     <input onClick={()=>{dispatch(setbuldingToggle())}}  checked={criticalInfraBuildingToggle} id="checked-checkbox-building" type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="checked-checkbox-building" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buildings</label>
     </div>

      <input onClick={()=>{dispatch(setamenitiesToggle())}}  checked={amenitiesToggle} id="checked-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amenities</label> 
     
    </div>
  )
}
