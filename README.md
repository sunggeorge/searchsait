<p align="center">
  <a href="https://searchsait.vercel.app"><img src="https://img.shields.io/website/https/searchsait.vercel.app.svg" alt="Website"></a>
  <a href="https://code.visualstudio.com/"><img src="https://badges.aleen42.com/src/visual_studio_code.svg" alt="VS Code Badge"></a>
  <a href="https://reactjs.org/"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/react.svg" alt="React Badge"></a>
  <a href="https://nodejs.org/en/"><img src="https://cdn.rawgit.com/aleen42/badges/master/src/python.svg" alt="Node.js"></a>
  <a href="https://github.com/sunggeorge/searchsait/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a>
</p>

# SAIT (Ellucian) Class Registration Planning Tool

This is a **Next.js + Python** application designed to assist with class registration planning. Originally developed for SAIT (Southern Alberta Institute of Technology). It has the potential to support most class registration systems built on the Ellucian platform. As a starter project, it offers a solid foundation with room for improvement and additional features.

---

## Features

- **Quick Class Search:** Search by name or code in the top textbox with autocompletion.
- **Class Combinations:** Select desired classes and instantly view valid combinations.
- **Visual Schedule & Availability:** Displays a weekly schedule and seat availability, styled like the mySAIT registration platform.
- **Instructor Ratings:** Matches instructor ratings from RateMyProfessors (RMP).

Contributions and feedback are welcome!

![Screenshot 1](https://github.com/user-attachments/assets/353433d5-f6c2-4233-bb1f-d47978e3bc13)
![Screenshot 2](https://github.com/user-attachments/assets/2415b478-e538-4bf5-b10f-7c8e723c564c)

### Notes

- The `public/res/*.json` files contain 2025 Winter class data for demo purposes, sourced publicly from SAIT Course Offerings and RMP.
- If no class combinations are displayed, it may indicate a time conflict or missing time data for some classes.
- RMP ratings rely on simple name matching, so errors may occur.
- For rapid development, JSON files store class data. A database could improve scalability, eliminating complex JSON manipulation in backend scripts (`P2`, `P3`).

---

## Next.js Frontend

The frontend is built with [Next.js](https://nextjs.org/), bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Key features include:

- **Dynamic Rendering:** The homepage (`app/page.js`) updates automatically with changes.
- **State Management:** Uses [Jotai](https://github.com/pmndrs/jotai) for global and component-level state.
- **Styling:** Combines Tailwind CSS and custom CSS (`app/globals.css`), with components in `app/components/`.

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

   # Star development server
   npm run dev
   # or
   yarn dev
   ```
Then open [http://localhost:3000](http://localhost:3000) to view the frontend.

---

## Python Backend

The backend fetches, refines, and processes class data, generating dropdown menus and instructor ratings via external APIs.

### Scripts:
- **Data Fetching:** `P1_getRawData.py` retrieves raw data from SAIT (or other Ellucian systems) and saves it locally. (`backend/rawdata`) Adapted from [ucrapi](https://github.com/jstnf/ucrapi.justinf.dev).
- **Data Refinement:** `P2_refineRawData.py` processes raw data into `class.json`.
- **Dropdown Generation:** `P3_genDropdown.py` Creates dropdown options `dropdown.json` from refined data.
- **CRN Generation and Instructor Info:** `P4_genCRN.py` Generates course registration numbers (CRN) and instructor details `instructor.json`.
- **`P5_getRMP.py` (optional)** Fetch and match professor ratings from RateMyProfessor using `RateMyProfessorAPI`. This is slow and should only be run when necessary.

### Setup Instructions:
1. **Set Up Virtual Environment:**
   ```bash
   cd backend
   python -m venv venv

   # Activate virtual environment (Windows)
   venv\Scripts\activate

   # Or on macOS/Linux:
   source venv/bin/activate
   ```
2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment Variables:**
   - Copy `backend/.env.sample` to `backend/.env` and update settings (e.g., `BASE_URL`, `TERM_CODE`, etc.).
4. **Run the Pipeline:**
   - Execute the main script to run the complete data fetching and processing pipeline:
     ```bash
     python main.py
     ```
   - This will sequentially run `P1_getRawData.py`, then `P2_refineRawData.py`, `P3_genDropdown.py` and `P4_genCRN.py` based on result of `P1` execution. Comment out `P5` or execute it separately if necessary.

### Execution Time (2025 Winter - 202430) class data:
- `P1` - `P4`: Less than 10 minutes
Data fetching, refining, and JSON generation
- `P5`: Around 4 hours
~4 hours (RMP matching, due to slow API responses). `RMP.json` is included so rerunning is unnecessary unless instructor data changes.
---

## Future Improvements

This starter application has significant potential for enhancements including:

- Dockerized environment with a database for class data.
- Enhanced UI/UX (e.g., filters for weekday or AM/PM, sorting by off-days or study days).
Sorting by number of off-day, study day
- Calendar export (replacing SAIT’s deprecated Ellucian GO).
- Anonymous class planning accounts.
- Advanced error handling, logging, and TypeScript integration.

The final goal isto rival tools like [searchNEU](https://github.com/sandboxnu/searchneu) or [notangles](https://github.com/devsoc-unsw/notangles).

