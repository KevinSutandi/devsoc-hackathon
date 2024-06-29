const DateBlock = ( { day, date } : { day: any, date: any } ) => {
  var dayString = 'MON';
  switch (day) {
    case day = 1: {
      dayString = 'MON';
      break;
    }
    case day = 2: {
      dayString = 'TUE';
      break;
    }
    case day = 3: {
      dayString = 'WED';
      break;
    }
    case day = 4: {
      dayString = 'THU';
      break;
    }
    case day = 5: {
      dayString = 'FRI';
      break;
    }
    case day = 6: {
      dayString = 'SAT';
      break;
    }
    case day = 7: {
      dayString = 'SUN';
      break;
    }
    default: {
      dayString = 'MON'
      break;
    }
  }
  
  return (
    <div className="bg-yellow-200 rounded-2xl px-4 py-2 flex flex-wrap justify-center text-center">
      <p className="w-full font-bold text-xl">{`${dayString}`}</p>
      <p className="w-full font-bold text-4xl mt-2">{`${date}`}</p>
    </div>
  )
}

export default DateBlock