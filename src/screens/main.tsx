import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  View,
  Colors,
  Switch, SegmentedControl
} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {Section} from '@app/components/section';
import {BButton, HeaderButton, HeaderIconButton} from '@app/components/button';
import {Reanimated2} from '@app/components/reanimated2';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import {NavioSection} from '@app/components/sections/NavioSection';
import {appearances, appearancesUI, appearanceUIToInternal} from "@app/utils/types/enums";


export const Messages: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {counter, ui} = useStores();
  const {t, api, navio} = useServices();

  // State (local)
  const [loading, setLoading] = useState(false);

  // API Methods
  const getCounterValue = useCallback(async () => {
    setLoading(true);
    try {
      const {value} = await api.counter.get();

      counter.set('value', value);
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }, [api.counter, counter]);
  const [appearance, setAppearance] = useState(ui.appearance);

  // Methods
  const handleCounterDec = () => counter.set('value', counter.value - 1);
  const handleCounterInc = () => counter.set('value', counter.value + 1);
  const handleCounterReset = () => counter.set('value', 0);
  const appearanceInitialIndex = appearances.findIndex(it => it === appearance);
  const appearanceSegments = appearancesUI.map(it => ({label: it}));
  const handleAppearanceIndexChange = (index: number) => {
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
    ui.set('appearance',appearance);
  }

  useEffect(() => {
    navigation.setOptions({ title: 'הודעות' });
  }, []);


/*
 <Switch value={false} onValueChange={() => console.log('value changed')}/>
 <ChipsInput
      placeholder={'Placeholder'}
      chips={[{label: 'Falcon 9'}, {label: 'Enterprise'}, {label: 'Challenger', borderRadius: 0}]}
  />
            <WheelPicker
              items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
              initialValue={'yes'}
              onChange={() => console.log('changed')}
          />
  */

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">


      </ScrollView>
    </View>
  );
});
Messages.options = () => ({
  title: services.t.do('home.title'),
});
/*
        <NavioSection />
        <Section title="Expo">
          <Text text60R textColor>
            Session ID: {Constants.sessionId}
          </Text>
          <Text text60R textColor>
            App name: {Application.applicationName}
          </Text>
        </Section>

        <Section title="Reanimated">
          <Reanimated2 />
        </Section>

        <Section title="MobX">
          <View centerV>
            <Text marginB-s2 text60R textColor>
              App launches: {ui.appLaunches}
            </Text>

            <Text marginB-s2 text60R textColor>
              Counter:{' '}
              <If
                _={loading}
                _then={<Text textColor>Loading...</Text>}
                _else={<Text textColor>{counter.value}</Text>}
              />
            </Text>

            <Row>
              <BButton margin-s1 label=" - " onPress={handleCounterDec} />
              <BButton margin-s1 label=" + " onPress={handleCounterInc} />
              <BButton margin-s1 label="reset" onPress={handleCounterReset} />
            </Row>
          </View>
        </Section>

        <Section title="API">
          <BButton margin-s1 label="Update counter value from API" onPress={getCounterValue} />
        </Section>
 */
