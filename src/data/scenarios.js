export const getScenarios = (gender) => {
  // Ajustes de texto según el género elegido
  const isFemale = gender === 'mujer';
  const isMale = gender === 'varon';
  
  // Escenario 2: Control
  let s2_description = "Estás saliendo con alguien hace unos meses. Últimamente, cuando te juntas con tus amistades o te pones cierta ropa, te hace comentarios como: '¿En serio vas a salir así?', y te pide que le mandes ubicación en tiempo real para 'saber que estás a salvo'.";
  if (isMale) s2_description = "Estás saliendo con alguien hace unos meses. Últimamente, te revisa el celular a escondidas para ver con quién hablas y te hace escenas de celos si sales solo con tus amigas/os, pidiéndote capturas de pantalla para 'saber dónde estás'.";

  // Escenario 6: Estereotipos de Carrera
  let s6_description = "En una charla de orientación vocacional, mencionas que quieres estudiar una carrera no tradicional. Una persona te responde: '¿Estás seguro/a? Esa carrera es demasiado pesada y no encaja con tu perfil'.";
  if (isFemale) s6_description = "En una charla de orientación vocacional, mencionas que quieres estudiar Ingeniería en Sistemas o Mecánica. Una persona te responde: '¿Estás segura? Es un ambiente muy de hombres y los números son pesados para vos'.";
  if (isMale) s6_description = "En una charla de orientación vocacional, mencionas que quieres estudiar Enfermería o ser Maestro Jardinero. Una persona te responde: '¿Estás seguro? Esas son carreras de mujeres, te vas a morir de hambre y se van a burlar de vos'.";

  return [
    {
      id: "s1_violencia_digital",
      title: "El Grupo de WhatsApp",
      category: "Violencia Digital",
      description: "Estás en el grupo de WhatsApp de tu curso. De repente, un compañero reenvía una foto íntima (nude) de una chica de otro curso sin su consentimiento y hace un chiste al respecto. Varios empiezan a reírse enviando emojis.",
      questions: [
        {
          id: "q1",
          text: "¿Qué decides hacer en ese momento?",
          options: [
            {
              id: "opt1",
              text: "Hablarle por privado al que mandó la foto y decirle que tenga cuidado con quién comparte esas cosas para que no lo sancionen.",
              isIdeal: false,
              feedback: "Esto parece responsable, pero al hacerlo por privado sigues permitiendo que el grupo valide la acción como un chiste. Además, el enfoque no debe ser 'evitar la sanción', sino entender el grave daño psicológico que causa la difusión no consentida.",
              metricCategory: "avoidance"
            },
            {
              id: "opt2",
              text: "Escribir en el grupo pidiendo que borren la foto, aunque sepas que probablemente te digan 'aguafiestas' o se burlen de ti.",
              isIdeal: true,
              feedback: "¡Excelente decisión! Alzar la voz corta la cadena de complicidad. Es realista que haya una sanción social del grupo (que te digan aburrido/a), pero dejar claro que la difusión no consentida es violencia es el único paso real para frenarla.",
              metricCategory: "intervention"
            },
            {
              id: "opt3",
              text: "Reenviársela a una amiga/o de tu entera confianza para preguntarle si conoce a la chica y evaluar qué pueden hacer.",
              isIdeal: false,
              feedback: "Aunque tu intención sea genuinamente ayudar, al reenviar la foto estás incurriendo en el mismo delito: difundir material íntimo sin consentimiento. La cadena debe cortarse de inmediato borrando la imagen.",
              metricCategory: "misinformation"
            }
          ]
        }
      ]
    },
    {
      id: "s2_igualdad_vinculos",
      title: "Control en la Relación",
      category: "Igualdad y Vínculos",
      description: s2_description,
      questions: [
        {
          id: "q1",
          text: "¿Cómo reaccionas ante esta situación?",
          options: [
            {
              id: "opt1",
              text: "Hago lo que me pide para que se quede tranquilo/a y vea que no oculto nada, total confío en mí.",
              isIdeal: false,
              feedback: "Cuidado: confundir control con cuidado es muy común. Aunque creas que darle información calmará sus celos, en realidad estás reforzando y normalizando un mecanismo de control abusivo sobre tu autonomía y privacidad.",
              metricCategory: "submissive"
            },
            {
              id: "opt2",
              text: "Le digo que no exagere, pero termino cediendo 'solo por esta vez' para no arruinar la salida con una pelea.",
              isIdeal: false,
              feedback: "Ceder temporalmente para evitar conflictos es una trampa frecuente. Poco a poco, los límites se van borrando y el comportamiento controlador se establece como la norma en la relación.",
              metricCategory: "avoidance"
            },
            {
              id: "opt3",
              text: "Le respondo que no voy a aceptar que me controle y pongo un límite claro, aunque me arriesgue a que se enoje y me deje de hablar.",
              isIdeal: true,
              feedback: "¡Muy bien! Establecer límites claros tiene a menudo un costo (enojos o silencios manipulativos), pero defender tu autonomía y privacidad es innegociable para construir un vínculo verdaderamente sano y parejo.",
              metricCategory: "boundary_setting"
            }
          ]
        }
      ]
    },
    {
      id: "s3_salud_integral",
      title: "Dudas en el Consultorio",
      category: "Salud Integral",
      description: "Estás en una fiesta y terminas en una situación íntima con alguien. Cuando llega el momento de avanzar, la persona te dice que 'no tiene preservativo pero que no pasa nada, que confíes porque está sano/a'.",
      questions: [
        {
          id: "q1",
          text: "¿Qué decisión tomas?",
          options: [
            {
              id: "opt1",
              text: "Aceptar continuar pero pedirle que tenga 'mucho cuidado', confiando en que por una sola vez es improbable que pase algo.",
              isIdeal: false,
              feedback: "Una sola vez es suficiente para contraer una Infección de Transmisión Sexual (ITS) o generar un embarazo no intencional. La confianza en la otra persona no reemplaza la prevención física.",
              metricCategory: "risk_taking"
            },
            {
              id: "opt2",
              text: "Cortar el momento y decirle que sin protección no hay trato, arriesgándote a que se ofenda o se corte todo el clima.",
              isIdeal: true,
              feedback: "¡Excelente decisión! Sostener tu límite cuando el clima ya avanzó es muy difícil pero vital. El uso del preservativo no es un insulto a la confianza, es cuidado mutuo. Tienes derecho a decir NO en cualquier etapa.",
              metricCategory: "prevention"
            },
            {
              id: "opt3",
              text: "Aceptar hacerlo solo un ratito sin protección y que después antes de terminar use el 'coito interrumpido' (acabar afuera).",
              isIdeal: false,
              feedback: "Mito muy peligroso: El líquido preseminal, que se libera mucho antes de terminar, puede contener espermatozoides e infecciones. El coito interrumpido no protege ni de embarazos ni de ITS.",
              metricCategory: "misinformation"
            }
          ]
        }
      ]
    },
    {
      id: "s4_diversidad",
      title: "El Chiste en el Aula",
      category: "Diversidad y Respeto",
      description: "Un compañero llega con las uñas pintadas al colegio. Otro compañero se burla en voz alta frente a todos diciendo que 'eso no es de hombres'.",
      questions: [
        {
          id: "q1",
          text: "¿Qué haces ante este comentario?",
          options: [
            {
              id: "opt1",
              text: "Decir en voz alta: '¡Qué buen color de uñas!', validándolo frente al grupo y desarmando la burla de los demás.",
              isIdeal: true,
              feedback: "¡Genial! Intervenir de forma positiva y validante neutraliza al agresor sin necesidad de iniciar una discusión violenta. Demuestra apoyo activo y frena el bullying desde la empatía.",
              metricCategory: "intervention"
            },
            {
              id: "opt2",
              text: "Reírme un poco para no quedar mal ni ser el foco de atención, pero mandarle un mensaje privado después diciéndole que le quedan bien.",
              isIdeal: false,
              feedback: "Tu intención privada es empática, pero al reírte en público estás participando del hostigamiento. El agresor entiende que el grupo (incluyéndote) aprueba su comportamiento.",
              metricCategory: "passive_support"
            },
            {
              id: "opt3",
              text: "Decirle al que se burla que lo deje en paz porque 'pobre, es su estilo y hay que tenerle pena'.",
              isIdeal: false,
              feedback: "Al defender a alguien desde la lástima o asumiendo que su expresión de género es un defecto que hay que 'tolerar', terminas reforzando el prejuicio en lugar de desarmarlo.",
              metricCategory: "misinformation"
            }
          ]
        }
      ]
    },
    {
      id: "s5_consentimiento",
      title: "La Fiesta",
      category: "Consentimiento",
      description: "Estás en una previa. Notas que una persona del grupo tomó demasiado y apenas puede mantenerse en pie. Alguien que conoces de vista se ofrece a 'llevarle a una habitación para que descanse', pero ves que le agarra por la cintura y la persona intoxicada no responde con claridad.",
      questions: [
        {
          id: "q1",
          text: "¿Cómo actúas?",
          options: [
            {
              id: "opt1",
              text: "Pregunto a otras personas si saben si son pareja; si me dicen que sí, asumo que está todo bien y dejo que se vayan.",
              isIdeal: false,
              feedback: "El consentimiento no se da por sentado ni siquiera estando en pareja. Si una persona está severamente intoxicada o inconsciente, NO puede dar consentimiento para NADA.",
              metricCategory: "avoidance"
            },
            {
              id: "opt2",
              text: "Seguir la situación de lejos para intervenir 'solo si veo que intenta quitarle la ropa o hacerle algo por la fuerza'.",
              isIdeal: false,
              feedback: "Esperar a ver violencia física es llegar tarde. El abuso suele darse en la vulnerabilidad. Alejar a alguien intoxicado del grupo ya es una situación de alto riesgo inminente.",
              metricCategory: "risk_taking"
            },
            {
              id: "opt3",
              text: "Interrumpir 'accidentalmente' pidiéndole a la persona intoxicada que te acompañe al baño con una excusa urgente, interponiéndote físicamente.",
              isIdeal: true,
              feedback: "¡Gran estrategia! Como espectador activo, usaste la técnica de 'distracción/interrupción'. Cortaste la situación de riesgo sin confrontación violenta y pudiste llevar a la persona a un entorno seguro.",
              metricCategory: "intervention"
            }
          ]
        }
      ]
    },
    {
      id: "s6_estereotipos",
      title: "Elección de Carrera",
      category: "Estereotipos",
      description: s6_description,
      questions: [
        {
          id: "q1",
          text: "¿Cuál es tu postura?",
          options: [
            {
              id: "opt1",
              text: "Le digo que voy a intentar cursar un año a ver qué onda, y si noto que el ambiente es muy difícil o me tratan mal, me cambio.",
              isIdeal: false,
              feedback: "Aunque es válido dudar, responder así demuestra cómo interiorizamos el miedo que generan los estereotipos. Te predispone a abandonar ante el primer obstáculo que encuentres.",
              metricCategory: "submissive"
            },
            {
              id: "opt2",
              text: "Afirmar con seguridad que te has informado sobre el plan de estudios y que tus habilidades no dependen de lo que dictan los estereotipos de género.",
              isIdeal: true,
              feedback: "¡Excelente! Responder con asertividad frente a micromachismos vocacionales reafirma tu autoestima. Las carreras, el talento y la vocación no tienen género.",
              metricCategory: "boundary_setting"
            },
            {
              id: "opt3",
              text: "Responder de forma muy agresiva diciendo que su comentario es retrógrado y machista frente a todo el grupo de la charla.",
              isIdeal: false,
              feedback: "Si bien el comentario es producto de un estereotipo, reaccionar con agresión frontal puede cerrar los canales de diálogo y desviarse del foco, que es afirmar tu propia decisión libremente.",
              metricCategory: "risk_taking" 
            }
          ]
        }
      ]
    }
  ];
};
