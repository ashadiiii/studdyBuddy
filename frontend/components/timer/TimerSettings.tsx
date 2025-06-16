
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TimerConfig {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

interface TimerSettingsProps {
  config: TimerConfig;
  onConfigChange: (config: TimerConfig) => void;
  onClose: () => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({ config, onConfigChange, onClose }) => {
  const handleDurationChange = (field: keyof TimerConfig, value: number) => {
    onConfigChange({
      ...config,
      [field]: value,
    });
  };

  const handleSwitchChange = (field: keyof TimerConfig, checked: boolean) => {
    onConfigChange({
      ...config,
      [field]: checked,
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Timer Settings</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="focus-duration" className="text-sm font-medium">
              Focus Duration (min)
            </Label>
            <Input
              id="focus-duration"
              type="number"
              value={config.focusDuration}
              onChange={(e) => handleDurationChange('focusDuration', parseInt(e.target.value) || 25)}
              min="1"
              max="60"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="short-break" className="text-sm font-medium">
              Short Break (min)
            </Label>
            <Input
              id="short-break"
              type="number"
              value={config.shortBreakDuration}
              onChange={(e) => handleDurationChange('shortBreakDuration', parseInt(e.target.value) || 5)}
              min="1"
              max="30"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="long-break" className="text-sm font-medium">
              Long Break (min)
            </Label>
            <Input
              id="long-break"
              type="number"
              value={config.longBreakDuration}
              onChange={(e) => handleDurationChange('longBreakDuration', parseInt(e.target.value) || 15)}
              min="1"
              max="60"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="sessions-count" className="text-sm font-medium">
            Sessions until Long Break
          </Label>
          <Input
            id="sessions-count"
            type="number"
            value={config.sessionsUntilLongBreak}
            onChange={(e) => handleDurationChange('sessionsUntilLongBreak', parseInt(e.target.value) || 4)}
            min="2"
            max="8"
            className="mt-1"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-start-breaks" className="text-sm font-medium">
              Auto-start Breaks
            </Label>
            <Switch
              id="auto-start-breaks"
              checked={config.autoStartBreaks}
              onCheckedChange={(checked) => handleSwitchChange('autoStartBreaks', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-start-focus" className="text-sm font-medium">
              Auto-start Focus Sessions
            </Label>
            <Switch
              id="auto-start-focus"
              checked={config.autoStartFocus}
              onCheckedChange={(checked) => handleSwitchChange('autoStartFocus', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerSettings;
