import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import LengthConverter from './pages/LengthConverter';
import WeightConverter from './pages/WeightConverter';
import LoanCalculator from './pages/LoanCalculator';
import DateCalculator from './pages/DateCalculator';
import WordCounter from './pages/WordCounter';
import CurrencyConverter from './pages/CurrencyConverter';
import UnicodeConverter from './pages/UnicodeConverter';
import LottoGenerator from './pages/LottoGenerator';
import SpecialCharacters from './pages/SpecialCharacters';
import AsciiTable from './pages/AsciiTable';
import ColorPicker from './pages/ColorPicker';
import IpAddress from './pages/IpAddress';
import Flashlight from './pages/Flashlight';
import QrGenerator from './pages/QrGenerator';
import BarcodeGenerator from './pages/BarcodeGenerator';
import StringConverter from './pages/StringConverter';
import HtmlFormatter from './pages/HtmlFormatter';
import CodeDiff from './pages/CodeDiff';
import Checklist from './pages/Checklist';
import WebEditor from './pages/WebEditor';
import ImageToBase64 from './pages/ImageToBase64';
import AsciiArt from './pages/AsciiArt';
import Base64Tool from './pages/Base64Tool';
import PasswordGenerator from './pages/PasswordGenerator';
import BloodType from './pages/BloodType';
import JsonFormatter from './pages/JsonFormatter';
import WorkHoursCalculator from './pages/WorkHoursCalculator';
import SalaryCalculator from './pages/SalaryCalculator';
import HashGenerator from './pages/HashGenerator';
import UuidGenerator from './pages/UuidGenerator';
import AgeCalculator from './pages/AgeCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import HtmlEncoder from './pages/HtmlEncoder';
import TimerStopwatch from './pages/TimerStopwatch';
import MbtiTest from './pages/MbtiTest';
import ImageResizer from './pages/ImageResizer';
import BaseConverter from './pages/BaseConverter';
import YoutubeThumbnail from './pages/YoutubeThumbnail';
import MarkdownEditor from './pages/MarkdownEditor';
import Saju from './pages/Saju';
import ZodiacFortune from './pages/ZodiacFortune';
import Horoscope from './pages/Horoscope';
import DreamInterpretation from './pages/DreamInterpretation';
import Biorhythm from './pages/Biorhythm';
import BirthGen from './pages/BirthGen';
import NameAnalysis from './pages/NameAnalysis';
import BMI from './pages/BMI';
import BMR from './pages/BMR';
import ReactionTest from './pages/ReactionTest';
import TypingTest from './pages/TypingTest';


import TarotCard from './pages/TarotCard';
import TemperatureConverter from './pages/TemperatureConverter';
import UrlEncoderDecoder from './pages/UrlEncoderDecoder';
import JwtDecoder from './pages/JwtDecoder';
import RegexTester from './pages/RegexTester';
import PomodoroTimer from './pages/PomodoroTimer';
import OneToFifty from './pages/OneToFifty';
import CpsTest from './pages/CpsTest';
import AimTrainer from './pages/AimTrainer';
import NumberMemory from './pages/NumberMemory';
import NumberBaseball from './pages/NumberBaseball';
import Minesweeper from './pages/Minesweeper';
import Roulette from './pages/Roulette';
import LadderGame from './pages/LadderGame';
import CronGenerator from './pages/CronGenerator';
import CsvJsonConverter from './pages/CsvJsonConverter';
import DiscountCalculator from './pages/DiscountCalculator';
import ColorExtractor from './pages/ColorExtractor';
import AreaConverter from './pages/AreaConverter';
import VolumeConverter from './pages/VolumeConverter';
import SpeedConverter from './pages/SpeedConverter';
import WorldClock from './pages/WorldClock';
import PercentCalculator from './pages/PercentCalculator';
import FractionCalculator from './pages/FractionCalculator';
import EncryptionTool from './pages/EncryptionTool';
import DiceRoller from './pages/DiceRoller';
import LunchRecommender from './pages/LunchRecommender';
import SeveranceCalculator from './pages/SeveranceCalculator';
import MinimumWageCalculator from './pages/MinimumWageCalculator';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/length" element={<LengthConverter />} />
              <Route path="/weight" element={<WeightConverter />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/date" element={<DateCalculator />} />
              <Route path="/word-count" element={<WordCounter />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/unicode" element={<UnicodeConverter />} />
              <Route path="/lotto" element={<LottoGenerator />} />
              <Route path="/special-char" element={<SpecialCharacters />} />
              <Route path="/ascii-table" element={<AsciiTable />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/ip-address" element={<IpAddress />} />
              <Route path="/flashlight" element={<Flashlight />} />
              <Route path="/qr-gen" element={<QrGenerator />} />
              <Route path="/qr-generator" element={<QrGenerator />} />
              <Route path="/barcode-gen" element={<BarcodeGenerator />} />
              <Route path="/string-converter" element={<StringConverter />} />
              <Route path="/html-view" element={<HtmlFormatter />} />
              <Route path="/diff" element={<CodeDiff />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/web-editor" element={<WebEditor />} />
              <Route path="/image-base64" element={<ImageToBase64 />} />
              <Route path="/ascii-art" element={<AsciiArt />} />
              <Route path="/base64" element={<Base64Tool />} />
              <Route path="/password-gen" element={<PasswordGenerator />} />
              <Route path="/blood-type" element={<BloodType />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/work-hours" element={<WorkHoursCalculator />} />
              <Route path="/salary-calc" element={<SalaryCalculator />} />
              <Route path="/hash-gen" element={<HashGenerator />} />
              <Route path="/uuid-gen" element={<UuidGenerator />} />
              <Route path="/age-calc" element={<AgeCalculator />} />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/html-encoder" element={<HtmlEncoder />} />
              <Route path="/timer" element={<TimerStopwatch />} />
              <Route path="/mbti" element={<MbtiTest />} />
              <Route path="/image-resize" element={<ImageResizer />} />
              <Route path="/base-converter" element={<BaseConverter />} />
              <Route path="/youtube-thumbnail" element={<YoutubeThumbnail />} />
              <Route path="/markdown-editor" element={<MarkdownEditor />} />
              <Route path="/saju" element={<Saju />} />
              <Route path="/zodiac-fortune" element={<ZodiacFortune />} />
              <Route path="/horoscope" element={<Horoscope />} />
              <Route path="/dream-interpretation" element={<DreamInterpretation />} />
              <Route path="/name-analysis" element={<NameAnalysis />} />
              <Route path="/biorhythm" element={<Biorhythm />} />
              <Route path="/birth-gen" element={<BirthGen />} />
              <Route path="/bmi" element={<BMI />} />
              <Route path="/bmr" element={<BMR />} />
              <Route path="/reaction-test" element={<ReactionTest />} />
              <Route path="/typing-test" element={<TypingTest />} />

              <Route path="/tarot" element={<TarotCard />} />
              <Route path="/temperature-converter" element={<TemperatureConverter />} />
              <Route path="/url-encoder" element={<UrlEncoderDecoder />} />
              <Route path="/jwt-decoder" element={<JwtDecoder />} />
              <Route path="/regex-tester" element={<RegexTester />} />
              <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
              <Route path="/1to50" element={<OneToFifty />} />
              <Route path="/cps-test" element={<CpsTest />} />
              <Route path="/aim-trainer" element={<AimTrainer />} />
              <Route path="/number-memory" element={<NumberMemory />} />
              <Route path="/number-baseball" element={<NumberBaseball />} />
              <Route path="/minesweeper" element={<Minesweeper />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/ladder-game" element={<LadderGame />} />
              <Route path="/cron-generator" element={<CronGenerator />} />
              <Route path="/csv-json" element={<CsvJsonConverter />} />
              <Route path="/discount-calculator" element={<DiscountCalculator />} />
              <Route path="/color-extractor" element={<ColorExtractor />} />
              <Route path="/area-converter" element={<AreaConverter />} />
              <Route path="/volume-converter" element={<VolumeConverter />} />
              <Route path="/speed-converter" element={<SpeedConverter />} />
              <Route path="/world-clock" element={<WorldClock />} />
              <Route path="/percent-calculator" element={<PercentCalculator />} />
              <Route path="/fraction-calculator" element={<FractionCalculator />} />
              <Route path="/encryption-tool" element={<EncryptionTool />} />
              <Route path="/dice-roller" element={<DiceRoller />} />
              <Route path="/lunch" element={<LunchRecommender />} />
              <Route path="/lunch-recommender" element={<LunchRecommender />} />
              <Route path="/severance-calc" element={<SeveranceCalculator />} />
              <Route path="/minimum-wage" element={<MinimumWageCalculator />} />
              <Route path="/min-wage-calc" element={<MinimumWageCalculator />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
