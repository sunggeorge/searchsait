import subprocess

def run_script(script_name):
    result = subprocess.run(["python", script_name], capture_output=True, text=True)
    print(result.stdout)
    return result.stdout

# Run P1_getRawData.py and capture its output
output = run_script("P1_getRawData.py")

if "FLAG_TRUE" in output:
    print("Flag is TRUE. Running remaining scripts...")
    run_script("P2_refineRawData.py")
    run_script("P3_genDropdown.py")
    run_script("P4_genCRN.py")
else:
    print("Flag is FALSE. Skipping remaining scripts.")