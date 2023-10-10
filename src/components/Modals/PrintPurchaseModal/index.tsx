import React, {useEffect, useState} from 'react';
import {
  Container,
  StepInfo,
  StepArea,
  StepSection,
  ModalArea,
  ModalTitle,
  ModalInfoArea,
} from './styles';
import {DynamicStep} from '@components/DynamicStep';
import {ButtonApp} from '@components/Base/Buttom';
import {DeviceEventEmitter} from 'react-native';

type PrintPurchaseModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

type StepStatusType = 'queue' | 'in_progress' | 'success' | 'error';

const ev = DeviceEventEmitter;

ev.emit('event-name', {es6rules: true, mixinsAreLame: true});
export const PrintPurchaseModal = ({
  showModal,
  closeModal,
}: PrintPurchaseModalProps): JSX.Element => {
  const [stepStatus, setStepStatus] = useState<Array<StepStatusType>>(() => {
    const output: Array<StepStatusType> = [];
    for (let i = 0; i < 4; i++) {
      output.push('queue');
    }
    return output;
  });

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ev.addListener('ok', (input: any) => {
    const steps: Array<StepStatusType> = stepStatus.map((vl, id) => {
      if (id < input.curr) {
        return 'success';
      }
      if (id === input.curr) {
        return 'in_progress';
      }
      return 'queue';
    });

    setStepStatus(steps);
  });

  const handleTest = async () => {
    console.debug('1');
    ev.emit('ok', {curr: 0});
    sleep(2000).then(async () => {
      console.debug('2');
      ev.emit('ok', {curr: 1});
      sleep(2000).then(async () => {
        console.debug('3');
        ev.emit('ok', {curr: 2});
        sleep(2000).then(() => {
          ev.emit('ok', {curr: 3});
          sleep(2000).then(() => {
            ev.emit('ok', {curr: 4});
          });
        });
      });
    });
  };

  return (
    <Container animationType="slide" transparent={true} visible={showModal}>
      <ModalArea>
        <StepArea>
          <ModalInfoArea>
            <ModalTitle>Finalizando</ModalTitle>
          </ModalInfoArea>
          <StepSection>
            <DynamicStep status={stepStatus[0]} text="Gerando a notinha..." />
            <DynamicStep
              status={'error'}
              text="Conectando-se à impressora..."
            />
            <DynamicStep status={stepStatus[2]} text="Imprimindo nota..." />
            <DynamicStep
              status={'in_progress'}
              text="Gravando no banco local..."
            />
          </StepSection>
          <ButtonApp name="Run" onPress={handleTest} />
        </StepArea>
      </ModalArea>
    </Container>
  );
};
