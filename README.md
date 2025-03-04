

<p align="center">
  <a href="searchsait.vercel.app"><img src="https://img.shields.io/website/https/searchsait.vercel.app.svg" alt="Website"></a> <a href="https://code.visualstudio.com/"><img src="https://badges.aleen42.com/src/visual_studio_code.svg" alt="VS Code Badge"></a> <a href="https://reactjs.org/"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/react.svg" alt="React Badge"></a>  <a href="https://nodejs.org/en/"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/python.svg" alt="Node.js"></a>  <a href="https://github.com/sunggeorge/searchsait/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a>
</p>


# SAIT (Ellucian) Class Registration Planning Tool

This is a **Next.js + Python** application designed to help with class registration planning originally aimed at SAIT (Southern Alberta Institute of Technology) but with the potential to support most class registration systems built on the Ellucian platform. As a starter application, there is plenty of room for improvement and additional features.

---

### Features:
- **Quick class search by name or code:** Search in the textbox on top with autocompletion.
- **Class combination:** Choose desired classes and browse valid combination instantly
- **Visual weekly schedule and seat availability:** Follow mySAIT class registration platform styles.
- **Instructor rating:** Instructor rating from RMP are matched.

Your contributions and feedback are welcome!

![image](https://github.com/user-attachments/assets/353433d5-f6c2-4233-bb1f-d47978e3bc13)

![image](https://github.com/user-attachments/assets/2415b478-e538-4bf5-b10f-7c8e723c564c)

### Remarks:
- `public/res/*.json` files for 2025 Winter class data included for demo use and they are all accessible publicly from the internet. (SAIT Course Offerings and RMP)
- For fast development as starter application, JSON files are used for class data in this project. Database will be another good option to consider as all fields can be stored. And no complicated JSON manipulation in backend scripts `P2`, `P3` will be needed. 
---

## Next.js Frontend

The frontend is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It includes basic features such as:
- **Dynamic Page Rendering:** The homepage is served by `app/page.js`. It auto-updates as you make changes.
- **State Management:** Global and component-level state is managed with tools like [Jotai](https://github.com/pmndrs/jotai).
- **Styling and UI Components:** Basic styling is applied through Tailwind CSS and custom CSS (`app/globals.css`), with components organized under `app/components/`.

To start the development server, run:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000) to view the frontend.

---

## Python Backend

The backend is responsible for fetching, refining, and processing class data as well as providing additional functionalities such as generating dropdown menus and fetching instructor ratings using external APIs.

### Scripts:
- **Data Fetching:** `P1_getRawData.py` retrieves raw data from SAIT (or other Ellucian-based systems) and saves it locally. (`backend/rawdata`) Mainly using logic from [ucrapi](https://github.com/jstnf/ucrapi.justinf.dev).
- **Data Refinement:** `P2_refineRawData.py` processes the raw data into `class.json`.
- **Dropdown Generation:** `P3_genDropdown.py` uses the refined data to generate dropdown options `dropdown.json` for class selection.
- **CRN Generation and Instructor Info:** `P4_genCRN.py` fetches course registration numbers (CRN) and corresponding instructor details `instructor.json`.
- **Optional RMP Integration:** `P5_getRMP.py` uses `RateMyProfessorAPI` to fetch and match professor ratings from RateMyProfessor. This package is extremely slow. Please only run when needed.

### Setup Instructions:
1. **Create and Activate Virtual Environment:**
   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate virtual environment (Windows)
   venv\Scripts\activate

   # Or on macOS/Linux:
   source venv/bin/activate
   ```
2. **Install Required Packages:**
   ```bash
   pip install -r backend/requirements.txt
   ```
3. **Configure Environment Variables:**
   - Copy `backend/.env.sample` to `backend/.env` and adjust your configuration (e.g., `BASE_URL`, `TERM_CODE`, etc.).
4. **Run the Backend Pipeline:**
   - Execute the master script to run the complete data fetching and processing pipeline:
     ```bash
     python backend/main.py
     ```
   - This will sequentially run `P1_getRawData.py`, then `P2_refineRawData.py`, `P3_genDropdown.py`, and optionally `P4_genCRN.py` based on flags in the output.

---

## Future Improvements

As a starter application, there is ample scope to enhance the functionality and robustness of this tool including:

- Docker environment with database for class data
- Improved UI/UX design for the frontend. For example:
Filter for weekday, AM/PM
Sorting by number of off-day, study day
- Export to calendar (SAIT's Ellucian GO is depreciated) 
- Anonymous code for class planning account.
- Advanced error handling, logging and state management with typescript.

The final goal can be like [searchNEU](https://github.com/sandboxnu/searchneu) or [notangles](https://github.com/devsoc-unsw/notangles).

