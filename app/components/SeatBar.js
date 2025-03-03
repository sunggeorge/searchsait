export default function SeatBar({enrollment, maxEnrollment}){

        const availableSeats = maxEnrollment - enrollment;
        const enrollmentRate = (enrollment / maxEnrollment) * 100;
        let progressBarColor;
        let barText;
            
        if(!maxEnrollment) return '';

        const progressBarStyle = {
          width: `${availableSeats/maxEnrollment}%`,
          backgroundColor: progressBarColor,
          height: '20px',
          position: 'relative', 
        };
      
        // Correct the width calculation
        progressBarStyle.width = `${(availableSeats / maxEnrollment) * 100}%`;

        // Update progressBarColor to mild tones similar to macron style
        if (enrollmentRate < 40) {
            progressBarColor = '#a2cf6e'; // Mild green
        } else if (enrollmentRate >= 40 && enrollmentRate <= 80) {
            progressBarColor = '#bde0fe'; // Mild yellow      
        } else {
            progressBarColor = '#ffadc6'; // Mild red
        }

        progressBarStyle.backgroundColor = progressBarColor;

        // If enrollmentRate indicates full, adjust width to 100%
        if (enrollment == maxEnrollment) {
            progressBarStyle.width = '100%'; 
            barText = 'Full';
        } else {
            barText = `${availableSeats} / ${maxEnrollment}`;
        }


        return (
            <div style={{ width: '60%', backgroundColor: '#ddd', height: '20px', position: 'relative' }}> {/* Container adjusted to 100% width */}
                <div style={progressBarStyle}></div> {/* Progress Bar */}
                <span style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    textAlign: 'center', 
                    color: 'black', 
                    lineHeight: '20px',
                    top: '0' }}>{barText}</span> {/* Overlay Text adjusted to be outside the progress bar but within the container */}
            </div>
        );



}