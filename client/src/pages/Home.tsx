import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus, Cat, CalendarDays, Coins, CheckCircle2, TrendingDown, Home as HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import catBg from "@/assets/images/cat-hotel-bg.png";

export default function Home() {
  const [cats, setCats] = useState(1);
  const [nights, setNights] = useState(1);

  // New Pricing Model: Base Room + Per Cat Fee
  const roomBasePrice = 200;
  const perCatFee = 200;

  // Calculate pricing
  const calculation = useMemo(() => {
    // 1. Calculate base daily rate: Room (200) + (Cats * 200)
    const dailyRoomFee = roomBasePrice;
    const dailyCatsFee = cats * perCatFee;
    const totalDailyBase = dailyRoomFee + dailyCatsFee;

    const subtotalBeforeNightsDiscount = totalDailyBase * nights;

    // 2. Calculate long-stay discount (Only goes down to 8折 to protect margins)
    let discountPercent = 0;
    if (nights >= 30) discountPercent = 0.20; // 8折
    else if (nights >= 15) discountPercent = 0.15; // 85折
    else if (nights >= 10) discountPercent = 0.10; // 9折
    else if (nights >= 5) discountPercent = 0.05;  // 95折

    const discountAmount = subtotalBeforeNightsDiscount * discountPercent;
    const finalTotal = subtotalBeforeNightsDiscount - discountAmount;

    return {
      dailyRoomFee,
      dailyCatsFee,
      totalDailyBase,
      subtotalBeforeNightsDiscount,
      discountPercent,
      discountAmount,
      finalTotal,
      averagePerNight: finalTotal / nights
    };
  }, [cats, nights]);

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background Header */}
      <div className="absolute top-0 left-0 right-0 h-[400px] -z-10 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background/100 z-10" />
        <img src={catBg} alt="Cozy Cat Hotel" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-full mb-4 text-white">
            <Cat size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            貓咪住宿計費建議
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            多貓優惠 & 長住折扣 試算表
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7 space-y-6"
          >
            <Card className="border-none shadow-md overflow-hidden bg-white/80 backdrop-blur-xl">
              <div className="h-2 w-full bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Cat className="text-primary" />
                  住宿貓口數量
                </CardTitle>
                <CardDescription className="text-base">
                  同一位主人的貓咪，同住一房可享多貓優惠
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between bg-muted/50 p-6 rounded-2xl">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-14 w-14 rounded-full border-2 bg-white hover:bg-white hover:text-primary hover:border-primary transition-colors shadow-sm"
                    onClick={() => setCats(Math.max(1, cats - 1))}
                    disabled={cats <= 1}
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                  <div className="text-center">
                    <span className="text-5xl font-bold text-primary block">{cats}</span>
                    <span className="text-muted-foreground font-medium">隻貓咪</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-14 w-14 rounded-full border-2 bg-white hover:bg-white hover:text-primary hover:border-primary transition-colors shadow-sm"
                    onClick={() => setCats(cats + 1)}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">計費邏輯：基本房費 + 貓口照護費</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HomeIcon size={20} />
                        <span className="font-bold">空間房費</span>
                      </div>
                      <div className="font-bold text-xl">200<span className="text-xs font-normal">/晚</span></div>
                    </div>
                    <div className="bg-secondary/10 text-secondary p-4 rounded-xl border border-secondary/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cat size={20} />
                        <span className="font-bold">每貓照護費</span>
                      </div>
                      <div className="font-bold text-xl">200<span className="text-xs font-normal">/晚</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center bg-muted/30 py-2 rounded-lg">
                    💡 1隻貓=500元/晚。2隻同房=600元/晚。3隻同房=800元/晚。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden bg-white/80 backdrop-blur-xl">
              <div className="h-2 w-full bg-secondary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CalendarDays className="text-secondary" />
                  住宿天數
                </CardTitle>
                <CardDescription className="text-base">
                  住越久，折扣越多！最高享 65 折優惠
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-5xl font-bold text-secondary">{nights} <span className="text-xl text-muted-foreground font-medium">晚</span></span>
                    
                    {calculation.discountPercent > 0 && (
                      <span className="inline-flex items-center gap-1 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full font-bold animate-in zoom-in">
                        <TrendingDown size={16} />
                        已享 {calculation.discountPercent * 100}% 折扣
                      </span>
                    )}
                  </div>
                  <Slider
                    defaultValue={[1]}
                    value={[nights]}
                    max={60}
                    min={1}
                    step={1}
                    onValueChange={(val) => setNights(val[0])}
                    className="py-4"
                  />
                </div>

                <div className="mt-2 space-y-3">
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">長住優惠規則</h4>
                  <div className="space-y-2">
                    {[
                      { range: '1-4 晚', discount: '原價', active: nights < 5 },
                      { range: '5-9 晚', discount: '95 折 (5% off)', active: nights >= 5 && nights < 10 },
                      { range: '10-14 晚', discount: '9 折 (10% off)', active: nights >= 10 && nights < 15 },
                      { range: '15-29 晚', discount: '75 折 (25% off)', active: nights >= 15 && nights < 30 },
                      { range: '30 晚以上', discount: '65 折 (35% off)', active: nights >= 30 }
                    ].map((rule, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          rule.active 
                            ? 'bg-secondary text-white shadow-md transform scale-[1.02]' 
                            : 'bg-muted/50 text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {rule.active ? <CheckCircle2 size={18} /> : <div className="w-[18px]" />}
                          <span className="font-bold">{rule.range}</span>
                        </div>
                        <span className="font-bold">{rule.discount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Receipt / Total */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="sticky top-6">
              <Card className="border-none shadow-xl bg-card overflow-hidden">
                <div className="bg-primary p-6 text-primary-foreground text-center">
                  <Coins className="mx-auto mb-2 opacity-80" size={32} />
                  <h3 className="text-xl font-bold mb-1">預估總費用</h3>
                  <div className="text-5xl font-black tabular-nums">
                    ${calculation.finalTotal.toLocaleString()}
                  </div>
                  <div className="text-primary-foreground/80 mt-2 text-sm font-medium">
                    平均每晚 ${Math.round(calculation.averagePerNight).toLocaleString()}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground mb-3 border-b pb-2">計費明細 ({nights}晚)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>基礎房費 (共用空間)</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">${calculation.dailyRoomFee} × {nights}</span>
                          <span className="font-bold w-16 text-right">${(calculation.dailyRoomFee * nights).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-primary">
                        <span>貓口照護費 ({cats}隻)</span>
                        <div className="flex items-center gap-4">
                          <span className="text-primary/70">${calculation.dailyCatsFee} × {nights}</span>
                          <span className="font-bold w-16 text-right">${(calculation.dailyCatsFee * nights).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">原始總價</span>
                      <span className="font-bold">${calculation.subtotalBeforeNightsDiscount.toLocaleString()}</span>
                    </div>
                    
                    {calculation.discountAmount > 0 && (
                      <div className="flex justify-between items-center text-destructive">
                        <span className="font-bold flex items-center gap-1">
                          長住折扣 ({(calculation.discountPercent * 100)}%)
                        </span>
                        <span className="font-bold">- ${calculation.discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="bg-muted/30 p-4 border-t border-border/50">
                  <Button className="w-full h-12 text-lg rounded-xl font-bold" size="lg">
                    複製這份報價方案
                  </Button>
                </div>
              </Card>

              {/* Tips */}
              <div className="mt-6 bg-accent/20 border border-accent rounded-2xl p-4">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-foreground">
                  <span className="text-xl">💡</span> 老闆經營建議
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  改用<strong>「基本房費 + 貓口費」</strong>的好處是：多貓同住時，您可以確保「每隻貓的清消與照顧成本」都有確實收回（不會因為打折而變成做白工）。這個邏輯對客人來說也很公平，因為他們只付了一次房間的錢。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
 }
