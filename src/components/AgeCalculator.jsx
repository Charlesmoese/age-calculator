import React, { useState } from 'react';
import AgeDisplay from './AgeDisplay';

const AgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
  const [error, setError] = useState('');

  const isValidDate = (day, month, year) => {
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);

    // Verifica se o ano é válido
    if (isNaN(yearNum) || yearNum < 1) {
      setError('Ano inválido. Insira um ano válido.');
      return false;
    }

    // Verifica se o mês é válido
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      setError('Mês inválido. Insira um mês entre 1 e 12.');
      return false;
    }

    // Verifica se o dia é válido
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      setError('Dia inválido. Insira um dia entre 1 e 31.');
      return false;
    }

    // Cria uma data com os valores fornecidos
    const date = new Date(yearNum, monthNum - 1, dayNum);

    // Verifica se a data criada corresponde aos valores fornecidos
    if (
      date.getFullYear() !== yearNum ||
      date.getMonth() !== monthNum - 1 ||
      date.getDate() !== dayNum
    ) {
      setError('Data inválida. Verifique o dia, mês ou ano.');
      return false;
    }

    return true;
  };

  const isFutureDate = (day, month, year) => {
    const today = new Date();
    const inputDate = new Date(year, month - 1, day);
    return inputDate > today; // Retorna true se a data for futura
  };

  const calculateAge = () => {
    // Verifica se todos os campos estão preenchidos
    if (!day || !month || !year) {
      setError('Por favor, preencha todos os campos.');
      setAge({ years: '--', months: '--', days: '--' });
      return;
    }

    // Verifica se a data é válida
    if (!isValidDate(day, month, year)) {
      setAge({ years: '--', months: '--', days: '--' });
      return;
    }

    // Verifica se a data é futura
    if (isFutureDate(day, month, year)) {
      setError('Data futura. Insira uma data do passado ou presente.');
      setAge({ years: '--', months: '--', days: '--' });
      return;
    }

    setError(''); // Limpa o erro se a data for válida

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajusta os meses e dias se necessário
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="calculator-container">
      <div className="input-group horizontal">
        <div className="input-field">
          <label>DAY</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="DD"
          />
        </div>
        <div className="input-field">
          <label>MONTH</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
          />
        </div>
        <div className="input-field">
          <label>YEAR</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="YYYY"
          />
        </div>
      </div>
      <p className={`error-message ${error ? 'visible' : ''}`}>{error}</p>
      <div className="button-container">
        <button className="calculate-button" onClick={calculateAge}>
          <span className="arrow">&#9660;</span>
        </button>
      </div>
      <AgeDisplay age={age} />
    </div>
  );
};

export default AgeCalculator;