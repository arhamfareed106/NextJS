// NOT IMPLEMENTED YET

const PercentageBar = () => {
  const originalData = [
    { percentage: 17.4, color: "bg-blue-400" },
    { percentage: 39.7, color: "bg-green-300" },
    { percentage: 17.4, color: "bg-sky-300" },
    { percentage: 14.6, color: "bg-orange-200" },
  ];

  // Calculate the total of original percentages
  const originalTotal = originalData.reduce(
    (sum, item) => sum + item.percentage,
    0
  );

  // Normalize the percentages to sum to 100%
  const normalizedData = originalData.map((item) => ({
    ...item,
    normalizedPercentage: (item.percentage / originalTotal) * 100,
  }));

  return (
    <div className="w-full h-8 flex rounded-lg overflow-hidden">
      {normalizedData.map((segment, index) => (
        <div
          key={index}
          className={`${segment.color} flex items-center justify-center`}
          style={{ width: `${segment.normalizedPercentage}%` }}
        >
          <span className="text-sm font-medium">{segment.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default PercentageBar;
