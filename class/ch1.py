
class Mobile:
    
    def __init__(self, processor, ram, color, display, battery_in_amh):
        
        self.processor = processor
        self.ram = ram
        self.color = color
        self.display = display
        self.batter_in_amh = battery_in_amh
        
    def change_part(self, type, arg):
        match type:
            case "processor":
                self.processor = arg
            case "ram":
                self.ram = arg
            case "color":
                self.color = arg
            case "display":
                self.display = arg 
            case "battery":
                self.battery = arg
                
    def log(self, name):
        
        print(f"""{name} has {self.processor} processor and comes with {self.ram} ram.
and it has {self.display} display with {self.color} color, and very powerfull battery
{self.batter_in_amh}amh battery""")
        
        
apple = Mobile("apple m4", 6000, "white", 6.7, 8000)
apple.log("apple")
apple.change_part("processor", "apple nvidia gtx")
apple.log("apple")
