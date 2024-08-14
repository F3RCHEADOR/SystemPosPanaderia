import React, { useState } from 'react';
import Harina from '../assets/harina.png';
import Gaseosas from '../assets/gaseosas.png';
import InventoryCategory from '../components/InventoryCategory';
import FormInventories from '../components/FormInventories';

function RegisterInventories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <section className="max-w-screen-xl mx-auto mt-8 px-4">
            <h1 className="text-center text-3xl font-bold mb-6">Agregar Inventarios</h1>
            <article className="grid grid-cols-3 gap-4 text-center text-2xl">
                {selectedCategory === 'panaderia' ? (
                    <>
                        <InventoryCategory
                            title="Suministros Panadería"
                            imageSrc={Harina}
                            altText="harina"
                            description={"Harina, Mantequilla, Huevos, Azucar."}
                            onClick={() => handleCategoryClick('panaderia')}
                            isSelected={selectedCategory === 'panaderia'}
                        />
                        <div className="col-span-2">
                            <FormInventories />
                        </div>
                    </>
                ) : selectedCategory === 'otros' ? (
                    <>
                        <div className="col-span-2">
                            <FormInventories />
                        </div>
                        <InventoryCategory
                            title="Otros"
                            imageSrc={Gaseosas}
                            altText="soda"
                            description={"Gaseosas, Cervezas, Lacteos y Jugos."}
                            onClick={() => handleCategoryClick('otros')}
                            isSelected={selectedCategory === 'otros'}
                        />
                    </>
                ) : (
                    <>
                        <InventoryCategory
                            title="Suministros Panadería"
                            imageSrc={Harina}
                            altText="harina"
                            description={"Harina, Mantequilla, Huevos, Azucar."}
                            onClick={() => handleCategoryClick('panaderia')}
                            isSelected={selectedCategory === 'panaderia'}
                        />
                        <div className='my-auto'><p>Escoge el tipo de Inventario</p></div>
                        <InventoryCategory
                            title="Otros"
                            imageSrc={Gaseosas}
                            altText="soda"
                            description={"Gaseosas, Cervezas, Lacteos y Jugos."}
                            onClick={() => handleCategoryClick('otros')}
                            isSelected={selectedCategory === 'otros'}
                        />
                    </>
                )}
            </article>
        </section>
    );
}

export default RegisterInventories;
