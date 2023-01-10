import {useEffect, useRef, useState} from "react"
import {PermissionsAndroid} from "react-native"
import Geolocation from "react-native-geolocation-service"

const watchCurrentLocation = async (successCallback, errorCallback) => {
  if (!(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))) {
    errorCallback("Permissions for location are not granted!")
  }
  
  return Geolocation.watchPosition(successCallback, errorCallback, {
    timeout: 3000,
    maximumAge: 500,
    enableHighAccuracy: true,
    distanceFilter: 0,
    useSignificantChanges: false,
  })
}

const stopWatchingLocation = (watchId) => {
  Geolocation.clearWatch(watchId);
  Geolocation.stopObserving(watchId);

}

export default useWatchLocation = () => {
  const [location, setlocation] = useState();  
  //const [location, setLocation] = useState();
  const [lastError, setLastError] = useState();
  const [locationToggle, setLocationToggle] = useState(false)
  const watchId = useRef(null)

  

  const startLocationWatch = () => {
    /*watchId.current=Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 1500}
  );*/
  watchId.current = Geolocation.getCurrentPosition(
      
    (position) => {
      
      setlocation(position)
      console.log(location);
   },
    (error) => {
      setLastError(error)
    }
  )
    
  }

  const cancelLocationWatch = () => {
    stopWatchingLocation(watchId.current)
    
    setlocation(null)
    setLastError(null)
  }

  const setLocationWatch = (flag) => {
    setLocationToggle(flag)
  }

  // execution after render when locationToggle is changed
  useEffect(() => {
    if (locationToggle) {
      startLocationWatch()
    } else cancelLocationWatch()
    return cancelLocationWatch()
  }, [locationToggle])

  // mount / unmount
  useEffect(() => {
    cancelLocationWatch()
  }, [])

  return { location, lastError, setLocationWatch }
  
}
