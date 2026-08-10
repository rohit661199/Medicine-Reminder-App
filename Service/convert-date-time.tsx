import moment from "moment";

export const formatDate = (timeStamp: any): Date => {
  if (!timeStamp) return new Date();
  const date = new Date(timeStamp);
  date.setHours(0, 0, 0, 0);
  return date;
}

export const formatDateForText = (date: Date | null | undefined) => {
  if (!date) return "Select Date";
  return moment(date).format('LL');
}

export const formatTime = (timeStamp: any) => {
  if (!timeStamp) return "Select Time";
  const date = new Date(timeStamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export const GetDateRangeToDisplay=() =>{
    const dateList=[];
    for(let i=0;i<=7;i++){
        dateList.push({
            date:moment().add(i,"days").format('DD'),
            day:moment().add(i,"days").format('dd'),
            formateDate:moment().add(i,"days").format('L')
        })

    }
    return dateList

}

export const GetPrevDataRangeToDisplay=() =>{
   const dateList=[];
    for(let i=0;i<=7;i++){
      const date = moment().subtract(i,'days')
        dateList.push({
            date:date.format('DD'),
            day:date.format('dd'),
            formateDate:date.format('L')
        })

    }
    return dateList

}

export const getDateRange=(startDate,endDate) =>{
  const start=moment(startDate,"MM/DD/YYYY")
   const end=moment(endDate,"MM/DD/YYYY")
   const dates=[]

   while(start.isSameOrBefore(end)){
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1,"days")
   }
   return dates
}