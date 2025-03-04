import os
import subprocess

def run_script(script, args=None):
    # Start the process with optional arguments
    current_dir = os.path.dirname(__file__)
    cmd = ["python", "-u", script] + (args if args else [])
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, text=True, cwd=current_dir)
    output_value = False
    
    # Read output dynamically
    while True:
        line = process.stdout.readline()
        if not line and process.poll() is not None:  # Process finished
            break
        if line:
            line = line.strip()
            print(f"Output from {script}: {line}")
            # Check for a specific marker to capture the value
            if line.startswith("RUN_ALL_SCRIPTS"):
                output_value = True
    
    process.wait()
    return output_value

def main():
    
    run_all_scripts = False
    
    # This script fetches raw class data from the internet.
    run_all_scripts = run_script("P1_getRawData.py")


    if run_all_scripts:
                
        # This script refines and formats the raw data into a structured format.
        run_script("P2_refineRawData.py")

        # Running P3_genDropdown.py:
        run_script("P3_genDropdown.py")
        
        # Running P4_genCRN.py:
        run_script("P4_genCRN.py")
        
        
        # Following P5 script take around 4 hours to run for demo data
        # It's due to the slow response of RateMyProfessor API
        # Only run when needed as instructor list is not updated frequently
        
        # Commented out to run with script above or run separately
        # run_script("P5_getRMP.py")
    else:
        print("No data fetched due to empty or wrong term code. Skipping remaining scripts.")

if __name__ == '__main__':
    main()