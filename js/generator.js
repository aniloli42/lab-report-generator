import { validate } from "./check.js";

validate();

if (localStorage.getItem("directPrint") == null) {
  location.replace("./dashboard.html");
}

// universal variables
const backDashboardBtn = document.getElementById("backBTN");
const errorMessageDiv = document.getElementById("errorDiv");
const containerDiv = document.querySelector(".container");
const showPrintDiv = document.getElementById("print");
const showPatientName = document.getElementById("showPatientName");
const showPatientAge = document.getElementById("showPatientAge");
const showPatientSex = document.getElementById("showPatientSex");
const showDate = document.getElementById("showDate");
const showDoctorName = document.getElementById("showDoctorName");
const showLabNo = document.getElementById("showLabNo");
const checkTestHandler = document.querySelectorAll("[data-checked]");
const testInclude = document.getElementById("testInclude");
let formInputs = [];
const mainForm = document.getElementById("mainForm");
const showReportsDiv = document.getElementById("showReports");
const printEdit = document.querySelector("#printEdit");
const printPageBtn = document.getElementById("printPage");
const nextPatient = document.querySelector("#nextPatient");
const savePrint = document.querySelector("#savePrint");
let getDirectPrintData = "";
let displayDate = "";
let successSaving = document.querySelector("#successSaving");

// Code Of Adding the test as per checkbox selected
const labTestHTML = {
  haematology: `<div class="input-group" id="haematology">
                <div class="input-title">HAEMATOLOGY TEST</div>
                <div class="input-div">
                <label for="wbc">WBC</label>
                <div class="inputfield">
                    <input type="number" name="wbc" id="wbc" />
                    <div class="unit">Ref.RANG: 4000 - 11000</div>
                    <div class="unit">/cu-mm</div>
                    
                </div>
                </div>
                <div class="input-div">
                <label for="rbc">RBC</label>
                <div class="inputfield">
                    <input type="number" name="rbc" id="rbc"/>
                    <div class="unit">Ref.RANG: 4.5 - 6.5</div>
                    <div class="unit">Million cu-mm</div>
                </div>
                </div>
                <div class="input-div">
                <label for="platelates">Platelates</label>
                <div class="inputfield">
                    <input type="number" name="platelates" id="platelates" />
                    <div class="unit">Ref.RANG: 150000 - 450000</div>
                    <div class="unit">/cu-mm</div>
                </div>
                </div>
                <div class="input-div">
                <label for="hb">HB</label>
                <div class="inputfield">
                    <input type="number" name="hb" id="hb" />
                    <div class="unit">Ref.RANG: M 12.5-18 F 11.5-16.5</div>
                    <div class="unit">G/dl</div>
                </div>
                </div>
                <div class="input-div">
                <label for="pcv">PCV</label>
                <div class="inputfield">
                    <input type="number" name="pcv" id="pcv" />
                    <div class="unit">Ref.RANG: 36%-54%</div>
                    <div class="unit">Fl</div>
                </div>
                </div>
                <div class="input-div">
                <label for="mcv">MCV</label>
                <div class="inputfield">
                    <input type="number" name="mcv" id="mcv" />
                    <div class="unit">Fl</div>
                </div>
                </div>
                <div class="input-div">
                <label for="mch">MCH</label>
                <div class="inputfield">
                    <input type="number" name="mch" id="mch" />
                    <div class="unit">Pg</div>
                </div>
                </div>
                <div class="input-div">
                <label for="mchc">MCHC</label>
                <div class="inputfield">
                    <input type="number" name="mchc" MCHCid="mchc" MCHC />
                    <div class="unit">%</div>
                </div>
                </div>
            </div>`,

  differential: `<div class="input-group" id="differential">
            <div class="input-title">DIFFERENTIAL COUNT</div>
            <div class="input-div">
              <label for="neutrophil">Neutrophil</label>
              <div class="inputfield">
                <input type="number" name="neutrophil" id="neutrophil" />
                <div class="unit">Ref.RANG: 40-70</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="lymphocyte">Lymphocyte</label>
              <div class="inputfield">
                <input type="number" name="lymphocyte" id="lymphocyte" />
                <div class="unit">Ref.RANG: 20-40</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="monocyte">Monocyte</label>
              <div class="inputfield">
                <input type="number" name="monocyte" id="monocyte" />
                <div class="unit">Ref.RANG: 2-10</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="eosinophil">Eosinophil</label>
              <div class="inputfield">
                <input type="number" name="eosinophil" id="eosinophil" />
                <div class="unit">Ref.RANG: 2-6</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="basophils">Basophils</label>
              <div class="inputfield">
                <input type="number" name="basophils" id="basophils" />
                <div class="unit">Ref.RANG: 0-1</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="reticulocyte">Reticulocyte</label>
              <div class="inputfield">
                <input type="number" name="reticulocyte" id="reticulocyte" />
                <div class="unit">Ref.RANG: 2-6</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="input-div">
              <label for="esr">ESR-(Wintrobes's)</label>
              <div class="inputfield">
                <input type="number" name="esr" id="esr" />
                <div class="unit">Ref.RANG: M 0-9 F 0-20</div>
                <div class="unit">mm/1st hr</div>
              </div>
            </div>
            <div class="input-div">
              <label for="bt">BT</label>
              <div class="inputfield">
                <input type="number" name="bt" id="bt" />
                <div class="unit">Ref.RANG: 1-7</div>
                <div class="unit">mm/min</div>
              </div>
            </div>
            <div class="input-div">
              <label for="ct">CT</label>
              <div class="inputfield">
                <input type="number" name="ct" id="ct" />
                <div class="unit">Ref.RANG: 5-10</div>
                <div class="unit">mm/min</div>
              </div>
            </div>
            <div class="input-div">
              <label for="rh">Blood Group/ RH</label>
              <div class="inputfield">
                <input type="number" name="rh" id="rh" />
              </div>
            </div>

            <div class="input-div">
              <label for="mpMf">Mp/MF</label>
              <div class="inputfield">
                <input type="number" name="mpMf" id="mpMf" />
              </div>
            </div>

            <div class="input-div">
              <label for="sickline">Sickline test</label>
              <div class="inputfield">
                <input type="number" name="sickline" id="sickline" />
              </div>
            </div>
          </div>`,
  biochemistry: `<div class="input-group" id="biochemistry">
            <div class="input-title">BIOCHEMISTRY TEST</div>
            <div class="input-div">
              <label for="fasting">Fasting (F)</label>
              <div class="inputfield">
                <input type="number" name="fasting" id="fasting" />
                <div class="unit">Ref.RANG: 70-110</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="bloodSugar">Blood Sugar (PP)</label>
              <div class="inputfield">
                <input type="number" name="bloodSugar" id="bloodSugar" />
                <div class="unit">Ref.RANG: 70-140</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="random">Random (R)</label>
              <div class="inputfield">
                <input type="number" name="random" id="random" />
                <div class="unit">Ref.RANG: 70-140</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="bUrea">B-urea</label>
              <div class="inputfield">
                <input type="number" name="bUrea" id="bUrea" />
                <div class="unit">Ref.RANG: 15-45</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="sCreatinine">S-creatinine</label>
              <div class="inputfield">
                <input type="number" name="sCreatinine" id="sCreatinine" />
                <div class="unit">Ref.RANG: 0.4-1.4</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="uricAcid">Uric Acid</label>
              <div class="inputfield">
                <input type="number" name="uricAcid" id="uricAcid" />
                <div class="unit">Ref.RANG: M 2-7 F 2-6</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="bilirubinTotal">Bilirubin Total</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="bilirubinTotal"
                  id="bilirubinTotal"
                />
                <div class="unit">Ref.RANG: 0.4-1.2</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="bilirubinDirect">Bilirubin Direct</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="bilirubinDirect"
                  id="bilirubinDirect"
                />
                <div class="unit">Ref.RANG: 0.0-0.4</div>
                <div class="unit">mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="alp">ALP</label>
              <div class="inputfield">
                <input type="number" name="alp" id="alp" />
                <div class="unit">Ref.RANG: 80-310</div>
                <div class="unit">IU/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="sgpt">SGPT</label>
              <div class="inputfield">
                <input type="number" name="sgpt" id="sgpt" />
                <div class="unit">Ref.RANG: 5-49</div>
                <div class="unit">IU/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="sgot">SGOT</label>
              <div class="inputfield">
                <input type="number" name="sgot" id="sgot" />
                <div class="unit">Ref.RANG: 5-45</div>
                <div class="unit">IU/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="totalProtein">Total Protein</label>
              <div class="inputfield">
                <input type="number" name="totalProtein" id="totalProtein" />
                <div class="unit">Ref.RANG: 6-8</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="albumin">Albumin</label>
              <div class="inputfield">
                <input type="number" name="albumin" id="albumin" />
                <div class="unit">Ref.RANG: 3.5-5</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="totalCholestrol">Total Cholestrol</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="totalCholestrol"
                  id="totalCholestrol"
                />
                <div class="unit">Ref.RANG: 150-250</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="triglycerides">Triglycerides</label>
              <div class="inputfield">
                <input type="number" name="triglycerides" id="triglycerides" />
                <div class="unit">Ref.RANG: 30-170</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="hdlCholesterol">HDL-cholesterol</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="hdlCholesterol"
                  id="hdlCholesterol"
                />
                <div class="unit">Ref.RANG: >35</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="ldlCholesterol">LDL-cholesterol</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="ldlCholesterol"
                  id="ldlCholesterol"
                />
                <div class="unit">Ref.RANG: <150 </div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="vldl">VLDL</label>
              <div class="inputfield">
                <input type="number" name="vldl" id="vldl" />
                <div class="unit">Ref.RANG: <40</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="ldh">LDH</label>
              <div class="inputfield">
                <input type="number" name="ldh" id="ldh" />
                <div class="unit">Ref.RANG: 225-450</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="cpk">CPK</label>
              <div class="inputfield">
                <input type="number" name="cpk" id="cpk" />
                <div class="unit">Ref.RANG: <190</div>
                <div class="unit">IU/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="sodium">Na+(Sodium)</label>
              <div class="inputfield">
                <input type="number" name="sodium" id="sodium" />
                <div class="unit">Ref.RANG: 135-155</div>
                <div class="unit">MEq/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="potassium">K+(Potassium)</label>
              <div class="inputfield">
                <input type="number" name="potassium" id="potassium" />
                <div class="unit">Ref.RANG: 3.5-5.5</div>
                <div class="unit">MEq/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="serumAmylase">Serum Amylase</label>
              <div class="inputfield">
                <input type="number" name="serumAmylase" id="serumAmylase" />
                <div class="unit">Ref.RANG: <200</div>
                <div class="unit">IU/L</div>
              </div>
            </div>

            <div class="input-div">
              <label for="calcium">Calcium</label>
              <div class="inputfield">
                <input type="number" name="calcium" id="calcium" />
                <div class="unit">Ref.RANG: 8.7-10.4</div>
                <div class="unit">Mg%</div>
              </div>
            </div>

            <!-- End Form -->
          </div>`,
  semen: `<div class="input-group" id="semen">
            <div class="input-title">SEMEN ANALYSIS</div>

            <div class="input-div">
              <label for="investigation">Investigation</label>
              <div class="inputfield">
                <div class="unit">Normal</div>
              </div>
            </div>

            <div class="input-div">
              <label for="collectionTime">Collection Time</label>
              <div class="inputfield">
                <input type="time" name="collectionTime" id="collectionTime" />
              </div>
            </div>

            <div class="input-div">
              <label for="volume">Volume</label>
              <div class="inputfield">
                <input type="number" name="volume" id="volume" />
                <div class="unit">Ref.RANG: 3-5</div>
                <div class="unit">ml</div>
              </div>
            </div>

            <div class="input-div">
              <label for="colour">Colour</label>
              <div class="inputfield">
                <input type="text" name="colour" id="colour" />
              </div>
            </div>

            <div class="input-div">
              <label for="ph">PH</label>
              <div class="inputfield">
                <input type="text" name="ph" id="ph" />
              </div>
            </div>

            <div class="input-div">
              <label for="examinationTime">Examination Time</label>
              <div class="inputfield">
                <input
                  type="time"
                  name="examinationTime"
                  id="examinationTime"
                />
              </div>
            </div>

            <div class="input-div">
              <label for="motile">Motile</label>
              <div class="inputfield">
                <input type="number" name="motile" id="motile" />
                <div class="unit">Ref.RANG: 60-80</div>
                <div class="unit">%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="nonMotile">Non Motile</label>
              <div class="inputfield">
                <input type="number" name="nonMotile" id="nonMotile" />
                <div class="unit">Ref.RANG: 20</div>
                <div class="unit">%</div>
              </div>
            </div>

            <div class="input-div">
              <label for="sluggishMotile">Sluggish Motile</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="sluggishMotile"
                  id="sluggishMotile"
                />
              </div>
            </div>

            <div class="input-div">
              <label for="totalCount">Total Count</label>
              <div class="inputfield">
                <input type="number" name="totalCount" id="totalCount" />
                <div class="unit">Ref.RANG: 60-150</div>
                <div class="unit">million/ml</div>
              </div>
            </div>

            <div class="input-div">
              <label for="pusCell">Pus Cell</label>
              <div class="inputfield">
                <input type="number" name="pusCell" id="pusCell" />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="epithelialCell">Epithelial Cell</label>
              <div class="inputfield">
                <input
                  type="number"
                  name="epithelialCell"
                  id="epithelialCell"
                />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="comment">Comment</label>
              <div class="inputfield">
                <input type="text" name="comment" id="comment" />
              </div>
            </div>

            <!-- End -->
          </div>`,
  serology: `<div class="input-group" id="serology">
            <div class="input-title">SEROLOGY TEST</div>

            <div class="input-div">
              <label for="raFactor">RA factor</label>
              <div class="inputfield">
                <input type="radio" name="raFactor" id="raFactor" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="raFactor" id="raFactor" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="raFactor" id="raFactor" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="crp">CRP</label>
              <div class="inputfield">
              <input type="radio" name="crp" id="crp" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="crp" id="crp" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="crp" id="crp" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="asoTitre">ASOTitre</label>
              <div class="inputfield">
              <input type="radio" name="asoTitre" id="asoTitre" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="asoTitre" id="asoTitre" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="asoTitre" id="asoTitre" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hiv">HIV</label>
              <div class="inputfield">
              <input type="radio" name="hiv" id="hiv" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hiv" id="hiv" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hiv" id="hiv" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hav">HAV</label>
              <div class="inputfield">
              <input type="radio" name="hav" id="hav" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hav" id="hav" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hav" id="hav" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hbSag">HBsAg</label>
              <div class="inputfield">
              <input type="radio" name="hbSag" id="hbSag" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hbSag" id="hbSag" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hbSag" id="hbSag" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="vdrlRpr">VDRL/RPR</label>
              <div class="inputfield">
              <input type="radio" name="vdrlRpr" id="vdrlRpr" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="vdrlRpr" id="vdrlRpr" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="vdrlRpr" id="vdrlRpr" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="tpha">TPHA</label>
              <div class="inputfield">
              <input type="radio" name="tpha" id="tpha" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="tpha" id="tpha" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="tpha" id="tpha" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="dengue">Dengue Igm/IgG</label>
              <div class="inputfield">
              <input type="radio" name="dengue" id="dengue" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="dengue" id="dengue" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="dengue" id="dengue" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="troponinI">Troponin I</label>
              <div class="inputfield">
              <input type="radio" name="troponinI" id="troponinI" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="troponinI" id="troponinI" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="troponinI" id="troponinI" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="tbCard">T.B. card Igm/IgG</label>
              <div class="inputfield">
              <input type="radio" name="tbCard" id="tbCard" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="tbCard" id="tbCard" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="tbCard" id="tbCard" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hPyloriIgG">H-Pylori/IgG</label>
              <div class="inputfield">
              <input type="radio" name="hPyloriIgG" id="hPyloriIgG" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hPyloriIgG" id="hPyloriIgG" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hPyloriIgG" id="hPyloriIgG" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hPyloriIgm">H-Pylori/Igm</label>
              <div class="inputfield">
              <input type="radio" name="hPyloriIgm" id="hPyloriIgm" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hPyloriIgm" id="hPyloriIgm" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hPyloriIgm" id="hPyloriIgm" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hev">HEV</label>
              <div class="inputfield">
              <input type="radio" name="hev" id="hev" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hev" id="hev" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hev" id="hev" value="Negative" />&nbsp;Negative&nbsp;
            </div>

            <div class="input-div">
              <label for="typhoidIgG">Typhoid IgG</label>
              <div class="inputfield">
              <input type="radio" name="typhoidIgG" id="typhoidIgG" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="typhoidIgG" id="typhoidIgG" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="typhoidIgG" id="typhoidIgG" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="typhoidIgm">Typhoid Igm</label>
              <div class="inputfield">
              <input type="radio" name="typhoidIgm" id="typhoidIgm" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="typhoidIgm" id="typhoidIgm" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="typhoidIgm" id="typhoidIgm" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>
          </div>`,
  widal: `<div class="input-group" id="widal">
            <div class="input-title">WIDAL TEST</div>

            <div class="input-div">
              <label for="sTyphiO">S.Typhi 'O'</label>
              <div class="inputfield">
              <input type="radio" name="sTyphiO" id="sTyphiO" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="sTyphiO" id="sTyphiO" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="sTyphiO" id="sTyphiO" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="sTyphiH">S.Typhi 'H'</label>
              <div class="inputfield">
                <input type="radio" name="sTyphiH" id="sTyphiH" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="sTyphiH" id="sTyphiH" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="sTyphiH" id="sTyphiH" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="sParatyphiAH">S.paratyphi 'AH'</label>
              <div class="inputfield">
                <input type="radio" name="sParatyphiAH" id="sParatyphiAH" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="sParatyphiAH" id="sParatyphiAH" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="sParatyphiAH" id="sParatyphiAH" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="sParatyphiBH">S.paratyphi 'BH'</label>
              <div class="inputfield">

                <input type="radio" name="sParatyphiBH" id="sParatyphiBH" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="sParatyphiBH" id="sParatyphiBH" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="sParatyphiBH" id="sParatyphiBH" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <div class="input-div">
              <label for="hPylory">Antigen for H-Pylory</label>
              <div class="inputfield">
              <input type="radio" name="hPylory" id="hPylory" value="" checked/>&nbsp;Not Measured&nbsp;
              <input type="radio" name="hPylory" id="hPylory" value="Positive" />&nbsp;Positive&nbsp;
              <input type="radio" name="hPylory" id="hPylory" value="Negative" />&nbsp;Negative&nbsp;

              </div>
            </div>

            <div class="input-div">
              <label for="fungusTest">Fungus Test</label>
              <div class="inputfield">
                <input type="radio" name="fungusTest" id="fungusTest" value="" checked/>&nbsp;Not Measured&nbsp;
                <input type="radio" name="fungusTest" id="fungusTest" value="Positive" />&nbsp;Positive&nbsp;
                <input type="radio" name="fungusTest" id="fungusTest" value="Negative" />&nbsp;Negative&nbsp;
              </div>
            </div>

            <!-- End input Group -->
          </div>`,

  urine: `<div class="input-group" id="urine">
            <div class="input-title">URINE ANALYSIS</div>

            <div class="input-div">
              <label for="urineColour">Colour</label>
              <div class="inputfield">
                <input type="text" name="urineColour" id="urineColour" />
              </div>
            </div>

            <div class="input-div">
              <label for="urineTransparency">Transparency</label>
              <div class="inputfield">
                <input
                  type="text"
                  name="urineTransparency"
                  id="urineTransparency"
                />
              </div>
            </div>

            <div class="input-div">
              <label><b>CHEMICAL EXAMINATION</b></label>
            </div>

            <div class="input-div">
              <label for="urineAlbumin">Albumin (Protein)</label>
              <div class="inputfield">
                <input type="text" name="urineAlbumin" id="urineAlbumin" />
              </div>
            </div>

            <div class="input-div">
              <label for="urineSugar">Sugar</label>
              <div class="inputfield">
                <input type="text" name="urineSugar" id="urineSugar" />
              </div>
            </div>

            <div class="input-div">
              <label><b>MICROSCOPIC EXAMINATION</b></label>
            </div>

            <div class="input-div">
              <label for="urineEpithelial">Epithelial Cell</label>
              <div class="inputfield">
                <input
                  type="text"
                  name="urineEpithelial"
                  id="urineEpithelial"
                />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="urinePus">Pus Cell</label>
              <div class="inputfield">
                <input type="text" name="urinePus" id="urinePus" />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="urineRBC">RBC</label>
              <div class="inputfield">
                <input type="text" name="urineRBC" id="urineRBC" />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="urineCaOxalate">Ca-Oxalate</label>
              <div class="inputfield">
                <input type="text" name="urineCaOxalate" id="urineCaOxalate" />
                <div class="unit">/HPF</div>
              </div>
            </div>

            <div class="input-div">
              <label for="urineCrystals">Crystals</label>
              <div class="inputfield">
                <input type="text" name="urineCrystals" id="urineCrystals" />
              </div>
            </div>

            <div class="input-div">
              <label for="urineOthers">Others</label>
              <div class="inputfield">
                <input type="text" name="urineOthers" id="urineOthers" />
              </div>
            </div>

            <div class="input-div">
              <label for="urineHCG">HCG (Pregnancy)</label>
              <div class="inputfield">
                <input type="text" name="urineHCG" id="urineHCG" />
              </div>
            </div>
            <!-- End input-->
          </div>`,
};

// remove the sessionstorage value
if (sessionStorage.getItem("reportData") != "") {
  sessionStorage.removeItem("reportData");
}

if (localStorage.getItem("directPrint") != "") {
  getDirectPrintData = JSON.parse(localStorage.getItem("directPrint"));
  if (getDirectPrintData.source == 1) {
    printEdit.style.display = "none";
    savePrint.style.display = "none";
    nextPatient.style.display = "none";
    printPageBtn.style.gridColumn = "1/3";

    let printNumber;
    if (localStorage.getItem("printNumber") != null) {
      printNumber = localStorage.getItem("printNumber");
    }
    let getSavedReports = JSON.parse(localStorage.getItem("savedReports"));
    getSavedReports[`${parseInt(printNumber)}`].forEach((tests) => {
      formInputs.push(tests);
    });
    generatePrintReport();
  }
}

// Back Button Implement
backDashboardBtn.addEventListener("click", () => {
  location.href = "./dashboard.html";
});

//  fetch the checked data

// track the which checkbox is checked
[...checkTestHandler].some((checkedBox) => {
  checkedBox.addEventListener("click", (e) => {
    if (!e.target.checked) {
      removeUncheckedTest(e.target.value);
      return;
    }
    populateTestDiv(e.target.value);
  });

  // if anyone check the test already from html file
  if (checkedBox.checked) populateTestDiv(checkedBox.value);
});

// populate test div entry
function populateTestDiv(checkBoxValue) {
  // generating div
  let generateDiv = document.createElement("div");
  generateDiv.innerHTML = labTestHTML[`${checkBoxValue}`];
  generateDiv.id = checkBoxValue;

  // append the generated Div
  testInclude.appendChild(generateDiv);
}

// remove the uncheckdiv;
function removeUncheckedTest(testIdName) {
  let removeUnchecked = document.getElementById(`${testIdName}`);
  testInclude.removeChild(removeUnchecked);
  return;
}

// fetch the form data
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formInputs = [];

  // check any test is checked
  if (!testCheck()) return;

  const formObj = new FormData(mainForm);

  for (let reportEntries of formObj.entries()) {
    if (reportEntries[1] === "") continue;
    let inputObj = {
      name: `${reportEntries[0]}`,
      value: `${reportEntries[1]}`,
    };
    formInputs.push(inputObj);
  }

  generatePrintReport();
});

// check test check function, if not checked then show error
function testCheck() {
  let checkResult = [...checkTestHandler].some((check) => check.checked);
  if (!checkResult) {
    errorMessage("Aauta bhaya ni lab test select garnus");
    return false;
  }
  return true;
}

// Error Message Creator
function errorMessage(message) {
  errorMessageDiv.style.cssText = "transform:scaleY(1)";
  errorMessageDiv.innerHTML = message;
  setTimeout(() => {
    errorMessageDiv.style.cssText = "transform:scaleY(0)";
  }, 1500);
}

// reset click handler
document.getElementById("resetBtn").addEventListener("click", () => {
  testInclude.innerHTML = "";
});

// generate print report
function generatePrintReport() {
  showPrintDiv.style.display = "block";
  containerDiv.style.display = "none";
  containerDiv.style.overflow = "hidden";
  customerDetailsPopulater(formInputs);
  reportPopulater(formInputs);
}

// customer Details
function customerDetailsPopulater(customerDetailsArray) {
  customerDetailsArray.forEach((customerDetails) => {
    if (customerDetails.name == "patientName")
      showPatientName.innerText = `Name: ${customerDetails.value}`;

    if (customerDetails.name == "patientAge")
      showPatientAge.innerText = `Age: ${customerDetails.value}`;

    if (customerDetails.name == "patientGender")
      showPatientSex.innerText = `Sex: ${customerDetails.value}`;

    if (customerDetails.name == "doctorName")
      showDoctorName.innerText = `Doctor: ${customerDetails.value}`;

    if (customerDetails.name == "labNo")
      showLabNo.innerText = `Lab No: ${customerDetails.value}`;

    if (customerDetails.name == "testDate")
      showDate.innerText = `Date: ${customerDetails.value}`;
  });

  // showDate in report
  if ((getDirectPrintData != "") & (getDirectPrintData.source == 0)) {
    let DateCreator = new Date();
    displayDate = `${DateCreator.getUTCFullYear()}-${
      DateCreator.getUTCMonth() + 1
    }-${DateCreator.getUTCDate()} AD`;
    showDate.innerText = `Date: ${displayDate}`;
    formInputs.push({ name: "testDate", value: displayDate });
    return;
  }
}

// Report Populator
function reportPopulater(reportDetailsArray) {
  reportDetailsArray.forEach((reportDetails) => {
    if (reportDetails.name == "checkTest")
      reportSectionTestValidator(reportDetails.value);
  });
}

// report section test validator
let testAvailable = [];
async function reportSectionTestValidator(testName) {
  let reportTestDetails = await testFetcher(testName);
  reportTestDetails.forEach((testDetails) => {
    let testValid = formInputs.filter(
      (tests) => tests.name == testDetails.test
    );
    if (testValid.length != 0) {
      testDetails.value = testValid[0].value;
      testAvailable.push(testDetails);
    }
  });
  reportSectionCreator(testName, testAvailable);
  testAvailable = [];
}

// data Fetcher
async function testFetcher(testFetchName) {
  let data = await fetch(`../json/test.json`);
  let fetchedData = await data.json();
  return fetchedData[`${testFetchName}`];
}

// report Section Creator

function reportSectionCreator(testTitle, testDatas) {
  let titleMaker = [
    { name: "haematology", visibleTitle: "HAEMATOLOGY TEST" },
    { name: "differential", visibleTitle: "DIFFERENTIAL COUNT" },
    { name: "biochemistry", visibleTitle: "BIOCHEMISTRY TEST" },
    { name: "semen", visibleTitle: "SEMEN ANALYSIS" },
    { name: "serology", visibleTitle: "SEROLOGY TEST" },
    { name: "widal", visibleTitle: "WIDAL TEST" },
    { name: "urine", visibleTitle: "URINE ANALYSIS" },
  ];
  let noUnitRefColumnTable = ["serology", "widal"];
  let showTitle = titleMaker.filter((title) => title.name == testTitle);
  let testHTML = `
        <section>
          <header><h2>${showTitle[0]["visibleTitle"]}</h2></header>
          <table>
          <thead>
            <tr>
              <th>TEST</th>
              <th>RESULT</th>
              `;
  if (noUnitRefColumnTable.indexOf(testTitle) == -1) {
    testHTML += `
              <th>UNIT</th>
              <th>REF.RANG</th>
              `;
  }
  testHTML += `
            </tr>
            </thead>
            <tbody>`;

  testDatas.forEach((creatingData) => {
    testHTML += `
            <tr>
              <td>${creatingData.name}</td>
              <td>${creatingData.value}</td>
              `;

    if (noUnitRefColumnTable.indexOf(testTitle) == -1) {
      testHTML += `
              <td>${
                creatingData.unit == undefined ? "-" : creatingData.unit
              }</td>
              <td>${creatingData.ref == undefined ? "-" : creatingData.ref}</td>
                   
   `;
    }
    testHTML += `</tr>`;
  });
  testHTML += `<tbody>
            </tbody>
          </table>
        </section>
`;
  showReportsDiv.innerHTML += testHTML;
  testHTML = null;
}

// print Click handler
printPageBtn.addEventListener("click", () => print());

// Edit the current details of patient
printEdit.addEventListener("click", () => {
  showPrintDiv.style.display = "none";
  containerDiv.style.display = "grid";
  containerDiv.style.overflow = "unset";
  showReports.innerHTML = "";
});

// New Patient Print Available
nextPatient.addEventListener("click", () => {
  mainForm.reset();
  testInclude.innerHTML = "";
  showPrintDiv.style.display = "none";
  containerDiv.style.overflow = "unset";
  containerDiv.style.display = "grid";
  showReports.innerHTML = "";
});

// Click on Save Report
savePrint.addEventListener("click", () => {
  let labNum = document.getElementById("labNo");
  if (localStorage.getItem("savedReports") == null)
    return createAndSaveReport();

  let savedReports = JSON.parse(localStorage.getItem("savedReports"));

  let loopExecutedBreak = 0;

  savedReports.forEach((savedReport, index) => {
    let findMatchLabTestNo = savedReport.find((tested) => {
      return tested.name == "labNo";
    });

    if (
      findMatchLabTestNo != undefined &&
      findMatchLabTestNo != null &&
      findMatchLabTestNo.value === labNum.value
    ) {
      updateReport(savedReports, index);
      loopExecutedBreak = 1;
      return;
    }

    if (
      findMatchLabTestNo != undefined &&
      findMatchLabTestNo != null &&
      findMatchLabTestNo.value !== labNum.value
    ) {
      if (loopExecutedBreak == 0) {
        saveReport(savedReports);
        loopExecutedBreak = 1;
        return;
      }
    }
  });
});

function createAndSaveReport() {
  localStorage.setItem("savedReports", JSON.stringify([formInputs]));
  saveStatus("Successfully Report Saved!!!");
}

function updateReport(savedReports, index) {
  savedReports[index] = formInputs;
  localStorage.setItem("savedReports", JSON.stringify(savedReports));
  saveStatus("Successfully Updated Saved!!!");
}

function saveReport(savedReports) {
  savedReports = [...savedReports, formInputs];

  localStorage.setItem("savedReports", JSON.stringify(savedReports));
  saveStatus("Successfully Report Saved!!!");
}

function saveStatus(message) {
  successSaving.style.display = "block";
  successSaving.innerText = message;
  setTimeout(() => {
    successSaving.style.display = "none";
  }, 2000);
}