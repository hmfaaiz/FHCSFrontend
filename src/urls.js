const domain="http://localhost:3000/"
export const adminsignin_url=`${domain}admin/signin`

export const getdriver_url=`${domain}resource/driver/GetDriverProfile`
export const registerdriver_url=`${domain}resource/driver/RegisterDriver`
export const deldriver_url=`${domain}resource/driver/DeleteDriver`
export const updatedriver_url=`${domain}resource/driver/UpdateDriverProfile`

//ambulance
export const getambulance_url=`${domain}resource/ambulance/GetAllAmbulances`
export const registerambulance_url=`${domain}resource/ambulance/AddAmbulance`
export const delambulance_url=`${domain}resource/ambulance/DeleteAmbulance`
export const updateambulance_url=`${domain}resource/ambulance/UpdateAmbulance`

//allocation
export const assigntodriver_url=`${domain}resource/allocation/AmbulanceToDriver`
export const unassigntodriver_url=`${domain}resource/allocation/AmbulanceUnassign`

//shift
export const getshift_url=`${domain}resource/shift/GetShift`
export const assignshift_url=`${domain}resource/driverManagement/assignshift`
export const unassignshift_url=`${domain}resource/driverManagement/UnAssignShift`
export const addshift_url=`${domain}resource/shift/AddShift`
export const updateshift_url=`${domain}resource/shift/UpdateShift`


//user
export const getuser_url=`${domain}user/activeuser/GetUser`